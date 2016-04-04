
var express = require('express');
var app = express();

var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;

//  Spotify API
var SpotifyWebAPI = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebAPI({
  clientId: 'c9473ef6a4b047409ddcde165c836c0e',
  clientSecret : '4d566de3bd99456099bce4af5e18c7e1',
  redirectUri : 'http://localhost:3000/spotifycallback/'
});
var authorizationCode = '';
var currentSpotifyState = '';


// Retrieve an access token.
// spotifyApi.clientCredentialsGrant()
//   .then(function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err);
//   });

//  Schema properties
var playlistSchema = require('./schemas/playlist_schema.json');
var songSchema = require('./schemas/song_schema.json');

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

var currentUserId = -1;
app.get('/spotify/login/:userid', function(req, res) {

  var userID = parseInt(req.params.userid);
  //  Hold the current user id in scope for the callback.
  this.currentUserId = userID;
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
app.get('/spotify/loggedin/:userid', function(req, res) {
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
app.delete('/spotify/login/:userid', function(req, res) {
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
app.post('/songlist', function(req, res) {
  console.log(req.body);
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


/*
 *  PLAYLIST FEED FUNCTIONS
 */

/**
 * Gets the PlaylistFeed for a particular user.
 */
app.get('/user/:userid/playlists', function(req, res) {
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
        console.log('Created playlist: ' , data.body['id']);
        var newPlaylist = createNewPlaylist(body.author, body.title, body.game, body.genre, body.description);
        newPlaylist.spotify_id = data.body['id'];
        res.status(201);
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
 * Creates a new, empty playlist
 */
function createNewPlaylist(userID, title, game, genre, description) {
  var user = readDocument('users', userID);
  var newPlaylist = {
    "game": game,
    "imageURL": "",
    "title": title,
    "author": userID,
    "votes": [],
    "genre": genre,
    "description": description,
    "spotify_id": -1,
    "url": "",
    "uri": "",
    "songs": []
  };
  newPlaylist = addDocument('playlists', newPlaylist);
  var playerPlaylists = readDocument('playlist-feeds', user.playlistfeed);
  playerPlaylists.contents.unshift(newPlaylist._id);
  writeDocument('playlist-feeds', playerPlaylists);
  return newPlaylist;
}

/**
 * Delete a playlist.
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

/**
 * Adds a song to a particular playlist.
 */
app.put('/playlist/:playlistid/songs/:userid', validate({body: songSchema}),
  function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userid, 10);
    var playlistID = parseInt(req.params.playlistid, 10);
    if (fromUser === userID) {
      var playlist = readDocument('playlists', playlistID);
      var song = {
        "spotify_id":body.spotify_id,
        "title":body.title,
        "artist":body.artist,
        "album":body.album,
        "uri":body.uri,
        "duration":body.duration
      };
      playlist.songs.push(song);
      writeDocument('playlists', playlist);
      res.send(playlist);
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  }
);

/**
 * Removes a song from a particular playlist.
 */
app.delete('/playlist/:playlistid/songs/:songindex', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistID = parseInt(req.params.playlistid, 10);
  var playlist = readDocument('playlists', playlistID);
  var songIndex = parseInt(req.params.songindex);
  if (playlist.author === fromUser) {
    if (songIndex !== -1) {
      playlist.songs.splice(songIndex, 1);
      writeDocument('playlists', playlist);
    }
    res.send(playlist);
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
