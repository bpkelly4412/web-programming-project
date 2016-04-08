
var express = require('express');
var app = express();

var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;
var getCollection = database.getCollection;

//  Spotify API
var SpotifyWebAPI = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebAPI({
  clientId: 'c9473ef6a4b047409ddcde165c836c0e',
  clientSecret : '4d566de3bd99456099bce4af5e18c7e1',
  redirectUri : 'http://localhost:3000/spotifycallback/'
});
var authorizationCode = '';
var currentSpotifyState = '';



//  Schema properties
var playlistSchema = require('./schemas/playlist_schema.json');
var songSchema = require('./schemas/song_schema.json');
var chatMessageSchema = require('./schemas/chat-message_schema.json');
var threadSchema = require('./schemas/thread_schema.json');
var commentSchema = require('./schemas/comment_schema.json');

app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.json());

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 * @param {string} authorizationLine The line from the header for authorization.
 * @return {number} The returned user id number.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

/*
 *  SPOTIFY AUTHORIZATION FUNCTIONS
 */

/**
 * Generates a random string containing numbers and letters
 * This is for the Spotify `state` parameter to guard from the redirect URI being guessed.
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Log the user into Spotify
 */

app.get('/spotify/user/:userid', function(req, res) {

  var userID = parseInt(req.params.userid);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userID) {
    var scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-read-private'];
    var state = generateRandomString(16);
    this.currentSpotifyState = state;
    var authURL = spotifyApi.createAuthorizeURL(scopes, state);
    res.send(authURL);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

/**
 * Callback for logging the user into spotify.
 */
app.get('/spotifycallback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  if (state === this.currentSpotifyState) {
    spotifyApi.authorizationCodeGrant(code).then(function(data) {
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      this.authorizationCode = code;
      res.redirect('back');
      // res.send();
    }, function(err) {
      console.log('Spotify: could not log in: ', err);
    });
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

/**
 * Checks if the user is logged into Spotify.
 */
app.get('/spotify/loggedin/user/:userid', function(req, res) {
  spotifyApi.refreshAccessToken();
  var userID = parseInt(req.params.userid);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userID) {
    if (spotifyApi.getAccessToken() !== undefined && this.authorizationCode !== undefined) {
      res.send(true);
    } else {
      res.send(false);
    }
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

/**
 * Disconnects Spotify.
 */
app.delete('/spotify/user/:userid', function(req, res) {
  var userID = parseInt(req.params.userid);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === userID) {
    spotifyApi.resetAccessToken();
    spotifyApi.resetRefreshToken();
    this.authorizationCode = '';
    res.send();
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});



/**
 * Search for songs on Spotify
 */
app.post('/spotify/songlist', function(req, res) {
  if (typeof(req.body) === 'string') {
    var songList = [];
    spotifyApi.searchTracks(req.body)
      .then(function(data) {
        data.body.tracks.items.map(function(nextItem) {
          var song = {
            spotify_id: "",
            title: "",
            artist: "",
            album: "",
            uri: "",
            duration: 0
          };
          song.spotify_id = nextItem.id;
          song.title = nextItem.name;
          if (nextItem.artists.length > 0) {
            song.artist = nextItem.artists[0].name;
          } else {
            song.artist = "Unknown";
          }
          song.album = nextItem.album.name;
          song.uri = nextItem.uri;
          song.duration = nextItem.duration_ms;
          songList.push(song);
        });
        res.send(songList);
      })
  } else {
    // 400: Bad Request.
    res.status(400).end();
  }
});

/**
 * Search for playlists on Spotify
 */
app.post('/spotify/playlistresults/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userid, 10);
  if (fromUser === userID) {
    if (typeof(req.body) === 'string') {
      var playlistResults = [];
      spotifyApi.searchPlaylists(req.body)
        .then(function (data) {
          data.body.playlists.items.map(function(nextPlaylist) {
            var imageurl = '';
            if (nextPlaylist.images.length > 0) {
              imageurl = nextPlaylist.images[0].url;
            }
            var newPlaylist = {
              playlist: {
                game: "",
                imageURL: imageurl,
                title: nextPlaylist.name,
                author: -1,
                votes: [],
                genre: "",
                description: "",
                spotify_id: nextPlaylist.id,
                spotify_author: nextPlaylist.owner.id,
                url: nextPlaylist.href,
                uri: nextPlaylist.uri,
                songs: []
              },
              numTracks: {
                total: nextPlaylist.tracks.total
              }
            };
            playlistResults.push(newPlaylist);
          });
          res.send(playlistResults);
        })
    } else {
      // 400: Bad Request.
      res.status(400).end();
    }
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});



/**
* Given a user ID, returns a UserData object.
*/
app.get('/user/:userID', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  if (fromUser === userID) {
    // Send response.
    var userData = readDocument('users', userID);
    res.send(userData);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});


/**
* Given a user ID and data, sets the users data to the new data
*/
app.put('/user/:userID', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userID, 10);
    var userData = req.body.data;
    if (fromUser === userID) {
	// Send response.
	var userData = writeDocument('users', userData);
	res.send(userData);
    } else {
	// 401: Unauthorized request.
	res.status(401).end();
    }
});

/*
* Given a recommendation key, removes the recommendation and adds the song to the playlist
 */
app.put('/user/:userID/recommendations/:key', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userID, 10);
    if (fromUser === userID) {
	var userData = readDocument('users', userID);
	var playlist = readDocument('playlists', userData.recommendations[key].plid);
	    userData.recommendations = userData.recommendations.filter(recommendation => recommendation._id !== key);
	playlist.songs.push({"title": userData.recommendations[key].song, "artist": userData.recommendations[key].artist});
	writeDocument('playlists', playlist);
	writeDocument('users', userData);
	res.send(userData);
    }
    else {
	res.status(401).end();
    }
});

/*
 * Given a recommendation key, removes the recommendation and adds the song to the playlist
 */
app.delete('/user/:userID/recommendations/:key', function(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userID, 10);
    if (fromUser === userID) {
	var userData = readDocument('users', userID);
	userData.recommendations = userData.recommendations.filter(recommendation => recommendation._id !== key);
	res.send(userData);
    }
    else {
	res.status(401).end();
    }
});



app.put('/user/:userID/name', function(req, res) {
  console.log("Server Side attempting to set nickname");
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  if (fromUser == userID) {
    // Send response.
    if (typeof(req.body) !== 'string') {
      // 400: Bad request.
      res.status(400).end();
      return;
    }
    var userData = readDocument('users', userID);
    userData.userName = body;
    writeDocument('users', userData)
    res.send(userData);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

app.put('/user/:userID/about', function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  if (fromUser == userID) {
    // Send response.
    if (typeof(body) !== 'string') {
      // 400: Bad request.
      res.status(400).end();
      return;
    }
    var userData = readDocument('users', userID);
    userData.about = body;
    writeDocument('users', userData)
    res.send(userData);
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

app.get('/user/:userID/nickName', function(req, res) {
  var userID = parseInt(req.params.userID, 10);
  // Send response.
  var userData = readDocument('users', userID);
  res.send(JSON.stringify(userData.nickName));
});

/*
 *  PLAYLIST FEED FUNCTIONS
 */

/**
 * Gets the PlaylistFeed for a particular user.
 */
app.get('/playlistfeed/user/:userid', function(req, res) {
  var userid = req.params.userid;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var useridNumber = parseInt(userid, 10);
  if (fromUser === useridNumber) {
    // Send response.
    res.send(getPlaylistFeed(userid));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

/**
 * Given a user ID (for now), returns a PlaylistFeed object.
 */
function getPlaylistFeed(userID) {
  var userData = readDocument('users', userID);
  var playlistfeed = readDocument('playlist-feeds', userData.playlistfeed);
  playlistfeed.contents = playlistfeed.contents.map(getPlaylist);
  return playlistfeed;
}

/**
 * Given a playlist ID returns a Playlist object.
 * @param {number} playlistID The playlist _id.
 * @return {Playlist} The playlist retrieved.
 */
function getPlaylist(playlistID) {
  // playlist.contents = playlist.songs.map(getSong);
  return readDocument('playlists', playlistID);
}

/**
 * Generates a playlist object without any tracks.
 * @param userID
 * @param title
 * @param game
 * @param genre
 * @param description
 * @param spotifyId
 * @param spotifyOwnerID
 * @param url
 * @param uri
 * @returns {{game: *, imageURL: string, title: *, author: *, votes: Array, genre: *, description: *, spotify_id: *, spotify_author: *, url: *, uri: *, songs: Array}}
 */
function createNewPlaylist(userID, title, game, genre, description, imageURL,  spotifyId, spotifyOwnerID, url, uri) {
  var user = readDocument('users', userID);
  var newPlaylist = {
    "userId": userID,
    "game": game,
    "imageURL": imageURL,
    "title": title,
    "author": userID,
    "votes": [],
    "popularity": 0,
    "timestamp": new Date().getTime(),
    "genre": genre,
    "description": description,
    "spotify_id": spotifyId,
    "spotify_author": spotifyOwnerID,
    "url": url,
    "uri": uri,
    "songs": []
  };
  newPlaylist = addDocument('playlists', newPlaylist);
  var playerPlaylists = readDocument('playlist-feeds', user.playlistfeed);
  playerPlaylists.contents.unshift(newPlaylist._id);
  writeDocument('playlist-feeds', playerPlaylists);
  return newPlaylist;
}

/**
 * Create a new playlist locally and on Spotify.
 * Will fail and return status 405 if there is a problem with the Spotify playlist.
 */
app.post('/playlist', validate({body: playlistSchema}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === body.userID) {
    var user = database.readDocument('users', fromUser);
    spotifyApi.createPlaylist(user.spotifyProfileName, body.title)
      .then(function(data) {

        var newPlaylist = createNewPlaylist(
          body.author,
          body.title,
          body.game,
          body.genre,
          body.description,
          "",
          data.body.id,
          data.body.owner.id,
          data.body.href,
          data.body.uri);
        res.send(newPlaylist);
      })
      .catch(function(err){
        console.log('Could not create playlist: ', err.message);
        res.status(405).end();
      });
  } else {
    res.status(401).end();
  }
});

/**
 * Add a playlist from spotify
 */
app.put('/playlistfeed/user/:userid/playlist/', validate({body: playlistSchema}),
  function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userid, 10);
    if (fromUser === userID) {
      var importedPlaylist = createNewPlaylist(
        userID,
        body.title,
        body.game,
        body.genre,
        body.description,
        body.imageURL,
        body.spotify_id,
        body.spotify_author,
        body.url,
        body.uri);
      spotifyApi.getPlaylistTracks(body.spotify_author, body.spotify_id)
        .then(function(trackData) {
          trackData.body.items.map(function (nextTrack) {
            var song = {
              spotify_id: nextTrack.track.id,
              title: nextTrack.track.name,
              artist: "",
              album: nextTrack.track.album.name,
              uri: nextTrack.track.uri,
              duration: nextTrack.track.duration_ms
            };
            if (nextTrack.track.artists.length > 0) {
              song.artist = nextTrack.track.artists[0].name;
            } else {
              song.artist = "Unknown";
            }
            importedPlaylist.songs.push(song);
          });

          writeDocument('playlists', importedPlaylist);
          res.send(importedPlaylist);
        })
        .catch(function(err){
          console.log('Could not create playlist: ', err.message);
          res.status(405).end();
        });
    }
  });

/**
 * Adds a song to a particular playlist.
 * If the playlist no longer exists on Spotify, then create it anew and add it.
 */
app.put('/playlist/:playlistid/songs/:userid', validate({body: songSchema}),
  function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userid, 10);
    var playlistID = parseInt(req.params.playlistid, 10);
    if (fromUser === userID) {
      var playlist = readDocument('playlists', playlistID);
      var user = database.readDocument('users', fromUser);
      if (user.spotifyProfileName === playlist.spotify_author) {
        var song = {
          "spotify_id":body.spotify_id,
          "title":body.title,
          "artist":body.artist,
          "album":body.album,
          "uri":body.uri,
          "duration":body.duration
        };
        spotifyApi.addTracksToPlaylist(user.spotifyProfileName, playlist.spotify_id, [song.uri])
          .then(function(data) {
            playlist.songs.push(song);
            writeDocument('playlists', playlist);
            res.send(playlist);
          })
          .catch(function(err){
            if (err.status === 404) {
              spotifyApi.createPlaylist(user.spotifyProfileName, playlist.title)
                .then(function(data) {
                  console.log('Playlist does not exist on spotify, creating new playlist: ' , data.body.id);
                  return spotifyApi.getPlaylistTracks(user.spotifyProfileName, playlist.spotify_id);
                })
                .then(function(data) {
                  console.log('...Adding tracks to the new playlist.');
                  var trackURIs = [];
                  for (song in playlist.songs) {
                    trackURIs.push(song.uri);
                  }
                  playlist.spotify_id = data.body.id;
                  playlist.spotify_author = data.body.owner.id;
                  playlist.url = data.body.href;
                  playlist.uri = data.body.uri;
                  return spotifyApi.addTracksToPlaylist(user.spotifyProfileName, playlist.spotify_id, trackURIs);
                })
                .then(function(data) {
                  res.send(playlist);
                })
                .catch(function(err){
                  console.log('Could not create playlist: ', err.message);
                  res.status(405).end();
                });
            } else {
              console.log('Could not add track to playlist: ', err.message);
              res.status(405).end();
            }
          });
      } else {
        // 401: Unauthorized.
        res.status(401).end();
      }

    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  }
);

/**
 * Removes a song from a particular playlist IF it is owned by the user on Spotify.
 */
app.delete('/playlist/:playlistid/songs/:songindex', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistID = parseInt(req.params.playlistid, 10);
  var playlist = readDocument('playlists', playlistID);
  var user = database.readDocument('users', fromUser);
  var songIndex = parseInt(req.params.songindex);
  if (songIndex !== -1) {
    var song = playlist.songs[songIndex];
    if (playlist.author === fromUser) {
      if (user.spotifyProfileName === playlist.spotify_author) {
        spotifyApi.removeTracksFromPlaylist(user.spotifyProfileName, playlist.spotify_id, [{
          'uri': song.uri
        }])
          .then(function(data) {
            playlist.songs.splice(songIndex, 1);
            writeDocument('playlists', playlist);
            res.send(playlist);
          })
          .catch(function(err){
            console.log('Could not remove track from playlist: ', err.message);
            res.status(405).end();
          });
      } else {
        // 401: Unauthorized.
        res.status(401).end();
      }
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  }
});

/**
 * Edit the local information of a playlist
 */
app.put('/playlist/:playlistid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistID = parseInt(req.params.playlistid, 10);
  var playlist = readDocument('playlists', playlistID);
  if (playlist.author === fromUser) {
    console.log(req.body);
    playlist.title = req.body.name;
    playlist.game = req.body.game;
    playlist.genre = req.body.genre;
    playlist.description = req.body.description;
    writeDocument('playlists', playlist);
    res.send(playlist);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/**
 * Delete a playlist from BBQForte.
 * This does not affect Spotify.
 */
app.delete('/playlist/:playlistid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistID = parseInt(req.params.playlistid, 10);
  var playlist = readDocument('playlists', playlistID);
  if (playlist.author === fromUser) {
    database.deleteDocument('playlists', playlistID);
    var playlistFeeds = database.getCollection('playlist-feeds');
    var playlistFeedIDs = Object.keys(playlistFeeds);
    playlistFeedIDs.forEach((playlistFeedID) => {
      var playlistFeed = playlistFeeds[playlistFeedID];
      var itemIdx = playlistFeed.contents.indexOf(playlistID);
      if (itemIdx !== -1) {
        playlistFeed.contents.splice(itemIdx, 1);
        database.writeDocument('playlist-feeds', playlistFeed);
      }
    });
    // Send a blank response to indicate success.
    res.send();
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/**
 * Adds a vote for a particular user
 */
app.put('/playlist/:playlistid/votes/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistID = parseInt(req.params.playlistid, 10);
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var playlist = readDocument('playlists', playlistID);
    if (playlist.votes.indexOf(userId) === -1) {
      playlist.votes.push(userId);
      writeDocument('playlists', playlist);
    }
    res.send(playlist.votes);
  } else {
    res.status(401).end();
  }
});

/**
 * Removes a vote from a playlist for a particular user.
 */
app.delete('/playlist/:playlistid/votes/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var playlistID = parseInt(req.params.playlistid, 10);
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var playlist = readDocument('playlists', playlistID);
    var voteIndex = playlist.votes.indexOf(userId);
    if (voteIndex !== -1) {
      playlist.votes.splice(voteIndex, 1);
      writeDocument('playlists', playlist);
    }
    res.send(playlist.votes);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
 *    ********* END of PLAYLIST functions
 */

/*
 * Returns the Carousel object
 */
app.get('/carousel/', function(req, res) {
  var carouselData = readDocument('carousel', 1);
  res.send(carouselData);
});

/*
 * Returns the NewsUpdates object
 */
app.get('/news-updates/', function(req, res) {
  var newsData = readDocument('newsUpdates', 1);
  res.send(newsData);
});


/*
 * Returns the RecentConversations object
*/
app.get('/private-chat/recent/:userID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);

  if (userID === fromUser) {
    var recentConversations = readDocument('recent-conversations', req.params.userID);

    recentConversations.userList = recentConversations.userList.map((id) => readDocument('users', id));
    res.send(recentConversations);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
 * Adds a user to the RecentConversations
*/
app.post('/private-chat/recent/:userID/add/:otherUserID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  var otherUserID = parseInt(req.params.otherUserID, 10);

  if (userID === fromUser) {
    var recentChatData = readDocument('recent-conversations', userID);

    if(recentChatData.userList.indexOf(otherUserID) === -1) {
      recentChatData.userList.unshift(otherUserID);
      writeDocument('recent-conversations', recentChatData);
    }

    res.send(recentChatData.userList.map((userID) => readDocument('users', userID)));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
 * Removes a user from the RecentConversations
*/
app.delete('/private-chat/recent/:userID/remove/:otherUserID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  var otherUserID = parseInt(req.params.otherUserID, 10);

  if (userID === fromUser) {
    var recentChatData = readDocument('recent-conversations', userID);
    var userIndex = recentChatData.userList.indexOf(otherUserID);
    recentChatData.userList.splice(userIndex, 1);
    writeDocument('recent-conversations', recentChatData);

    res.send(recentChatData.userList.map((userID) => readDocument('users', userID)));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
 * Returns the PrivateChatLiveHelp object
*/
app.get('/private-chat/live-help/:userID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);

  if (userID === fromUser) {
    var liveHelpData = readDocument('liveHelp', userID);
    liveHelpData.contents.forEach((category) => {
      category.userList = category.userList.map((id) => readDocument('users', id))
    });

    res.send(liveHelpData);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

function getConversationsSync(userID) {
  var conversationsData = readDocument('conversations', userID);
  conversationsData.chatlogs.forEach((chatlog) => {
    chatlog.otherUser = readDocument('users', chatlog.otherUser);

    chatlog.messages.forEach((message) => {
      message.author = readDocument('users', message.author);
    })
  })
  return conversationsData;
}

/*
 * Returns the PrivateChatConversation object
*/
app.get('/private-chat/conversations/:userID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);

  if (userID === fromUser) {
    var syncedConversations = getConversationsSync(userID);

    res.send(syncedConversations);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
 * Adds a new conversation (chatlog entry in chatlogs index) for a user in 'conversations'
*/
app.post('/private-chat/conversations/:userID/create-chat/:otherUserID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  var otherUserID = parseInt(req.params.otherUserID, 10);

  if (userID === fromUser) {
    var conversationsData = readDocument('conversations', userID);
    conversationsData.chatlogs.push({
      "otherUser": otherUserID,
      "messages": []
    })
    writeDocument('conversations', conversationsData);

    var syncedConversations = getConversationsSync(userID);
    res.send(syncedConversations);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
 * Adds a new message to the messages array of a user's chatlogs in 'conversations'
*/
app.post('/private-chat/conversations/:userID/chat-with/:otherUserIndex', validate({ body: chatMessageSchema}), function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  var otherUserIndex = parseInt(req.params.otherUserIndex, 10);

  if (userID === fromUser) {
    var conversationsData = readDocument('conversations', userID);
    conversationsData.chatlogs[otherUserIndex].messages.push({
      "author": userID,
      "content": req.body.content
    })
    writeDocument('conversations', conversationsData);

    var syncedConversations = getConversationsSync(userID);
    res.send(syncedConversations);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/**
* Switches the chat box to display a conversation with a different user
*/
app.put('/private-chat/switch/:userID/to/:otherUserID', function (req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userID = parseInt(req.params.userID, 10);
  var otherUserID = parseInt(req.params.otherUserID, 10);

  if (userID === fromUser) {
    var userData = readDocument('users', userID);
    userData.chattingWith = otherUserID;
    writeDocument('users', userData);

    res.send(userData);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

/*
* Compute the 8 top playlists (according to @param compare) in database
* and return them as Top JSON
*/
function getTopCategory(compare){
  var playlistsJSON = getCollection('playlists');
  // converting playlistsJSON to an array of JSON
  var playlists = [];
  for(var x in playlistsJSON){
    playlists.push(playlistsJSON[x]);
  }
  // sorting playlists
  playlists.sort(compare);
  var newCategory = {
    ".id": 1,
    "contents": []
  };
  // Traversing the top 8 top playlists and creating new entry
  // for each playlists corresponding to different games
  for(var i = 0; i<playlists.length && i < 8; i++){
    var index = indexOfGame(playlists[i].game, newCategory.contents);
    if(index == -1){
      var newSection = {
        "imageURL": playlists[i].imageURL,
        "gameTitle": playlists[i].game,
        "playlists": [playlists[i]._id]
      };
      newCategory.contents.push(newSection);
    }else{
      newCategory.contents[index].playlists.push(playlists[i]._id);
    }
  }
  return newCategory;
}

/*
* Returns the index of gameTitle (string) within contents (array) in MostPopular JSON
*/
function indexOfGame (gameTitle, contents) {
  for(var i = 0; i < contents.length; i++){
    if(contents[i].gameTitle.toLowerCase() == gameTitle.toLowerCase())
      return i;
  }
  return -1;
}

/*
 * Returns the MostPopular object
 */
app.get('/most-popular/', function(req, res) {
  var mostPopularData = getTopCategory(function(a,b){
    return b.votes.length - a.votes.length;
  });
  mostPopularData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  res.send(mostPopularData);
});

/*
 * Returns the HighestRated object
 */
app.get('/highest-rated/', function(req, res) {
  var highestRatedData = getTopCategory(function(a,b){
    return b.votes.length - a.votes.length;
  });

  highestRatedData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  res.send(highestRatedData);
});

/*
* Compute the 8 Rising playlists in database and return them as Rising JSON
*/
function getRising(){
  var playlistsJSON = getCollection('playlists');
  // converting playlistsJSON to an array of JSON
  var playlists = [];
  var rising = [];
  for(var x in playlistsJSON){
    playlists.push(playlistsJSON[x]);
  }
  // sorting playlists
  playlists.sort(function(a,b){
    return b.votes.length - a.votes.length;
  });
  for(var i = 0; i<playlists.length && rising.length < 8; i++){
    var year = new Date().getUTCFullYear();
    var playlistYear = new Date(playlists[i].timestamp).getUTCFullYear();
    console.log("yaer:" + year + " - " + "playlistYear: " + playlistYear);
    if(year - playlistYear <= 1){
      rising.push(playlists[i]);
      console.log("playlists[i]");
      console.log(playlists[i]);
    }
  }
  var newCategory = {
    ".id": 1,
    "contents": []
  };
  // Traversing the top 8 top playlists and creating new entry
  // for each playlists corresponding to different games
  for(var j = 0; j<rising.length && j < 8; j++){
    var index = indexOfGame(rising[j].game, newCategory.contents);
    if(index == -1){
      var newSection = {
        "imageURL": rising[j].imageURL,
        "gameTitle": rising[j].game,
        "playlists": [rising[j]._id]
      };
      newCategory.contents.push(newSection);
    }else{
      newCategory.contents[index].playlists.push(rising[j]._id);
    }
  }
  return newCategory;
}

/*
 * Returns the Rising object
 */
app.get('/rising/', function(req, res) {
  var risingData = getRising();
  risingData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  res.send(risingData);
});

/*
 * Returns the NewRelease object
 */
app.get('/new-release/', function(req, res) {
  var newReleaseData = getTopCategory(function(a,b){
    return b.timestamp.length - a.timestamp.length;
  });
  newReleaseData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  res.send(newReleaseData);
});

/**
* Given a playlist ID returns a Playlist object.
*/
function getPlaylistWithAuthor(playlistID) {
  var playlist = readDocument('playlists', playlistID);
  var userID = playlist.author;
  playlist.author = readDocument('users', userID).userName
  return playlist;
}

/*
 * Returns the Forum object
 */
app.get('/forum/', function(req,res){
  var forumData = readDocument('forums', 1);
  res.send(forumData);
});

/*
 * Returns the Topics object
 */
app.get('/forum/category/:category/topic/:topicID',  function(req,res){
  var forumData = readDocument('forums', 1);
  var topic = forumData.categories[parseInt(req.params.category)].topics[parseInt(req.params.topicID)];
  res.send(topic);
});


/*
 * Adds a Thread object
 */

function postThread(category, topicId, title, author, contents){
  var time = new Date().getTime();
  var forumData = readDocument('forums', 1);

  forumData.categories[category].topics[topicId].threads.push({
    "title": title,
    "postCount": 0,
    "posts": [
      {
      "_id": forumData.categories[category].topics[topicId].threads.length,
      "author": author,
      "postDate": time,
      "contents": contents
    }
  ]
})
writeDocument('forums', forumData);
forumData.categories[category].topics[topicId].postCount = forumData.categories[category].topics[topicId].postCount + 1;
writeDocument('forums', forumData);
forumData.categories[parseInt(category)].topics[topicId].threadCount = forumData.categories[category].topics[topicId].threadCount + 1;
writeDocument('forums', forumData);

}

app.post('/forum/category/:category/topic/:topicId/newTopic', function(req, res){
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser == body.author){
    postThread(req.params.category, req.params.topicId, body.title, body.author, body.contents)
    res.status(201);
  }
  else{
    res.status(401).end();
  }
});

/*
 * Adds a Comment object
 */

 function postComment( user, category, topicID, threadID, contents) {
   var time = new Date().getTime();
   var forumData = readDocument('forums', 1);

   forumData.categories[category].topics[topicID].threads[threadID].posts.push({
         "author": user,
         "postDate": time,
         "contents": contents
       });
   writeDocument('forums', forumData);
   forumData.categories[category].topics[topicID].postCount = forumData.categories[category].topics[topicID].postCount + 1;
   writeDocument('forums', forumData);
   forumData.categories[category].topics[topicID].threads[threadID].postCount =  forumData.categories[category].topics[topicID].threads[threadID].postCount + 1;
   writeDocument('forums', forumData);
 }

 app.post('/forum/category/:category/topic/:topicId/thread/:threadid', function(req, res){
   var body = req.body;
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   if (fromUser == body.author){
     postComment(body.author, body.category, body.topicId, body.threadId, body.contents)
     res.status(201);
   }
   else{
     res.status(401).end();
   }
 });


/**
 * Reset the database
 */
app.post('/resetdb', function(req, res) {
  console.log("Resetting the database...");
  database.resetDatabase();
  res.send();
});

/**
 * Translate JSON Schema Validation failures into error 400s.
 */
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});

/**
 * Starts the server on localhost:3000
 */
app.listen(3000, function() {
  console.log('Example app listening on port 3000.');
});
