
var express = require('express');
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
// Creates an Express server.
var app = express();

var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;     // Delete once everthing is migrated
var writeDocument = database.writeDocument;     // Delete once everthing is migrated
var addDocument = database.addDocument;     // Delete once everthing is migrated
var deleteDocument = database.deleteDocument;     // Delete once everthing is migrated
var getCollection = database.getCollection;     // Delete once everthing is migrated

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

var ResetDatabase = require('./resetdatabase');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/bbqforte';
var ResetDatabase = require('./resetdatabase');

MongoClient.connect(url, function(err, db) {

  app.use(express.static('../client/build'));
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use('/mongo_express', mongo_express(mongo_express_config));

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
      if (typeof id === 'string') {
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

  /**
   * Resolves a list of user objects. Returns an object that maps user IDs to
   * user objects.
   */
  function resolveUserObjects(userList, callback) {
    // Special case: userList is empty.
    // It would be invalid to query the database with a logical OR
    // query with an empty array.
    if (userList.length === 0) {
      callback(null, {});
    } else {
      // Build up a MongoDB "OR" query to resolve all of the user objects
      // in the userList.
      var query = {
        $or: userList.map((id) => { return {_id: id } })
      };
      // Resolve 'like' counter
      db.collection('users').find(query).toArray(function(err, users) {
        if (err) {
          return callback(err);
        }
        // Build a map from ID to user object.
        // (so userMap["4"] will give the user with ID 4)
        var userMap = {};
        users.forEach((user) => {
          userMap[user._id] = user;
        });
        callback(null, userMap);
      });
    }
  }

  /**
   * Helper function: Sends back HTTP response with error code 500 due to
   * a database error.
   */
  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
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
  var generateRandomString = function (length) {
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

  app.get('/spotify/user/:userid', function (req, res) {

    var userID = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userID) {
      var scopes = [
        'user-read-private',
        'user-read-email',
        'playlist-modify-public',
        'playlist-read-collaborative',
        'playlist-modify-private',
        'playlist-read-private'
      ];
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
  app.get('/spotifycallback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    if (state === this.currentSpotifyState) {
      spotifyApi.authorizationCodeGrant(code).then(function (data) {
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        this.authorizationCode = code;
        res.redirect('back');
        // res.send();
      }, function (err) {
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
  app.get('/spotify/loggedin/user/:userid', function (req, res) {
    spotifyApi.refreshAccessToken();
    var userID = req.params.userid;
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
  app.delete('/spotify/user/:userid', function (req, res) {
    var userID = req.params.userid;
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
  app.post('/spotify/songlist', function (req, res) {
    if (typeof(req.body) === 'string') {
      var songList = [];
      spotifyApi.searchTracks(req.body)
        .then(function (data) {
          data.body.tracks.items.map(function (nextItem) {
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
  app.post('/spotify/playlistresults/:userid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = req.params.userid;
    if (fromUser === userID) {
      if (typeof(req.body) === 'string') {
        var playlistResults = [];
        spotifyApi.searchPlaylists(req.body)
          .then(function (data) {
            data.body.playlists.items.map(function (nextPlaylist) {
              var imageurl = '';
              if (nextPlaylist.images.length > 0) {
                imageurl = nextPlaylist.images[0].url;
              }
              var newPlaylist = {
                playlist: {
                  game: "",
                  imageURL: imageurl,
                  title: nextPlaylist.name,
                  author: "",
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
  app.get('/user/:userID', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = req.params.userID;
    if (fromUser === userID) {
      // Send response.
      db.collection('users').findOne({ _id: new ObjectID(userID) }, function (err, userData) {
        if (err) {
          sendDatabaseError(err);
        } else if (userData === null) {
          res.send(null);
        }
        res.status(201);
        res.send(userData);
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });


  /**
   * Given a user ID and data, sets the users data to the new data
   */
  app.put('/user/:userID', function (req, res) {
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
  app.put('/user/:userID/recommendations/:key', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userID, 10);
    if (fromUser === userID) {
      var userData = readDocument('users', userID);
      var playlist = readDocument('playlists', userData.recommendations[key].plid);
      userData.recommendations = userData.recommendations.filter(recommendation => recommendation._id !== key);
      playlist.songs.push({
        "title": userData.recommendations[key].song,
        "artist": userData.recommendations[key].artist
      });
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
  app.delete('/user/:userID/recommendations/:key', function (req, res) {
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


  app.put('/user/:userID/name', function (req, res) {
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

  app.put('/user/:userID/about', function (req, res) {
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

  app.get('/user/:userID/nickName', function (req, res) {
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
  app.get('/playlistfeed/user/:userid', function (req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userid) {
      getPlaylistFeed(new ObjectID(userid), function (err, playlistFeedData) {
        if (err) {
          res.status(500).send("Database error: " + err);
        } else if (playlistFeedData === null) {
          res.status(400).send("Could not look up feed for user " + userid);
        } else {
          res.send(playlistFeedData);
        }
      });
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  /**
   * Given a user ID (for now), returns a PlaylistFeed object.
   */
  function getPlaylistFeed(userID, callback) {
    db.collection('users').findOne({ _id: userID }, function (err, userData) {
      if (err) {
        return callback(err);
      } else if (userData === null) {
        return callback(null, null);
      }
      db.collection('playlist-feeds').findOne({ _id: userData.playlistfeed }, function (err, playlistFeedData) {
        if (err) {
          return callback(err);
        } else if (playlistFeedData === null) {
          // Feed not found.
          return callback(null, null);
        }

        var resolvedContents = [];

        function processNextPlaylist(i) {
          getPlaylist(playlistFeedData.contents[i], function(err, playlist) {
            if (err) {
              callback(err);
            } else {
              resolvedContents.push(playlist);
              if (resolvedContents.length === playlistFeedData.contents.length) {
                playlistFeedData.contents = resolvedContents;
                callback(null, playlistFeedData);
              } else {
                processNextPlaylist(i + 1);
              }
            }
          });
        }

        if (playlistFeedData.contents.length === 0) {
          callback(null, playlistFeedData);
        } else {
          processNextPlaylist(0);
        }
      });
    });
  }

  /**
   * Given a playlist ID returns a Playlist object.
   * @param {number} playlistID The playlist _id.
   * @return {Playlist} The playlist retrieved.
   */
  function getPlaylist(playlistID, callback) {
    db.collection('playlists').findOne({ _id: playlistID }, function (err, playlist) {
      if (err) {
        return callback(err);
      } else if (playlist === null) {
        return callback(null, null);
      }

      var userList = [playlist.author];
      resolveUserObjects(userList, function(err, userMap) {
        playlist.author = userMap[playlist.author];
        callback(null, playlist);
      });
    });
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
  function createNewPlaylist(
    userID,
    title,
    game,
    genre,
    description,
    imageURL,
    spotifyId,
    spotifyOwnerID,
    url,
    uri,
    callback)
  {
    var newPlaylist = {
      "userId": new ObjectID(userID),
      "game": game,
      "imageURL": imageURL,
      "title": title,
      "author": new ObjectID(userID),
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

    db.collection('playlists').insertOne(newPlaylist, function(err, result) {
      if (err) {
        return callback(err);
      }
      // Update the playlist id
      newPlaylist._id = result.insertedId;
      // Retrieve the author's user object
      db.collection('users').findOne({ _id: new ObjectID(userID) }, function(err, userObject) {
        if (err) {
          return callback(err);
        }
        // Update the author's feed with the new status update's ID.
        db.collection('playlist-feeds').updateOne({ _id: new ObjectID(userObject.playlistfeed) },
          {
            $push: {
              contents: {
                $each: [newPlaylist._id],
                $position: 0
              }
            }
          },
          function(err) {
            if (err) {
              return callback(err);
            }
            // Return the new status update to the application.
            callback(null, newPlaylist);
          }
        );
      });
    });
  }

  /**
   * Create a new playlist locally and on Spotify.
   * Will fail and return status 405 if there is a problem with the Spotify playlist.
   */
  app.post('/playlist', validate({body: playlistSchema}),
    function (req, res) {
      var body = req.body;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if (fromUser === body.userID) {
        db.collection('users').findOne({ _id: new ObjectID(body.userID) },
          function (err, user) {
            if (err) {
              res.status(500).send("A database error occurred: " + err);
            } else {
              spotifyApi.createPlaylist(user.spotifyProfileName, body.title)
                .then(function (data) {
                  createNewPlaylist(
                    body.author,
                    body.title,
                    body.game,
                    body.genre,
                    body.description,
                    "",
                    data.body.id,
                    data.body.owner.id,
                    data.body.href,
                    data.body.uri,
                    function (err, newPlaylist) {
                      if (err) {
                        // A database error happened.
                        // 500: Internal error.
                        res.status(500).send("A database error occurred: " + err);
                      } else {
                        // When POST creates a new resource, we should tell the client about it
                        // in the 'Location' header and use status code 201.
                        res.status(201);
                        res.set('Location', '/playlist/' + newPlaylist._id);
                        // Send the update!
                        res.send(newPlaylist);
                      }
                    });
                })
                .catch(function (err) {
                  res.status(405).send('Could not create playlist: ' + err);
                });
            }
          });

      } else {
        res.status(401).end();
      }
    });

  /**
   * Add a playlist from spotify
   */
  app.put('/playlistfeed/user/:userid/playlist/', validate({body: playlistSchema}),
    function (req, res) {
      var body = req.body;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userID = req.params.userid;
      if (fromUser === userID) {
        createNewPlaylist(
          userID,
          body.title,
          body.game,
          body.genre,
          body.description,
          body.imageURL,
          body.spotify_id,
          body.spotify_author,
          body.url,
          body.uri, function (err, importedPlaylist) {
            spotifyApi.getPlaylistTracks(body.spotify_author, body.spotify_id)
              .then(function (trackData) {
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

                db.collection('playlists').updateOne( { _id: new ObjectID(importedPlaylist._id) },
                  {
                    $push: {
                      songs:{
                        $each: importedPlaylist.songs
                      }
                    }
                  }, function (err) {
                    if (err) {
                      return sendDatabaseError(res, err);
                    }
                    console.log(importedPlaylist);
                    res.status(201);
                    res.set('Location', '/playlist/' + importedPlaylist._id);
                    res.send(importedPlaylist);
                  });
              })
              .catch(function (err) {
                res.status(405).send('Could not create playlist: ' + err.message);
              });
          }
        );
      } else {
        res.status(401).end();
      }
    });

  /**
   * Adds a song to a particular playlist.
   */
  app.put('/playlist/:playlistid/songs/:userid', validate({body: songSchema}),
    function (req, res) {
      var body = req.body;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userID = req.params.userid;
      var playlistID = req.params.playlistid;
      if (fromUser === userID) {

        //  Check if the user's spotify id is the same as the playlist's spotify id
        db.collection('users').findOne({ _id: new ObjectID(userID) }, function (err, user) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          db.collection('playlists').findOne({ _id: new ObjectID(playlistID) }, function (err, playlist) {
            if (err) {
              return sendDatabaseError(res, err);
            }

            //  Add the song to the playlist
            if (user.spotifyProfileName === playlist.spotify_author) {
              var song = {
                "spotify_id": body.spotify_id,
                "title": body.title,
                "artist": body.artist,
                "album": body.album,
                "uri": body.uri,
                "duration": body.duration
              };
              spotifyApi.addTracksToPlaylist(user.spotifyProfileName, playlist.spotify_id, [song.uri])
                .then(function (data) {
                  //  After adding the track to the Spotify playlist, add it to the user's local playlist
                  db.collection('playlists').updateOne({ _id: new ObjectID(playlistID) }, {
                    $push: {
                      songs: song
                    }
                  }, function(err) {
                    if (err) {
                      return sendDatabaseError(res, err);
                    }
                    playlist.songs.push(song);
                    res.status(201);
                    res.send(playlist);
                  });

                })
                .catch(function (err) {
                  return sendDatabaseError(res, err);
                });
            } else {
              // 401: Unauthorized.
              res.status(401).end();
            }
          });
        });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  }
);

  /**
   * Removes a song from a particular playlist IF it is owned by the user on Spotify.
   */
  app.delete('/playlist/:playlistid/spotify/:spotifyauthor/spotifyuser/:userspotify/songs/:songindex/user/:userid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    var playlistID = req.params.playlistid;
    var spotifyAuthor = req.params.spotifyauthor;
    var userSpotify = req.params.userspotify;
    var songIndex = req.params.songindex;


    //  The playlist can only have songs removed if the user is also the playlist's author.
    if (userId === fromUser && spotifyAuthor === userSpotify) {
      db.collection('playlists').findOne({ _id: new ObjectID(playlistID) }, function (err, playlist) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        var song = playlist.songs[songIndex];
        var songId = song.spotify_id;
        spotifyApi.removeTracksFromPlaylist(userSpotify, playlist.spotify_id, [{ 'uri': song.uri }])
          .then(function () {
            db.collection('playlists').updateOne({ _id: new ObjectID(playlistID) },
              {
                $pull: {
                  songs: { spotify_id: songId }
                }
              }, function(err) {
                if (err) {
                  return sendDatabaseError(res, err);
                }
                db.collection('playlists').findOne({ _id: new ObjectID(playlistID) }, function (err, editedPlaylist) {
                  if (err) {
                    return sendDatabaseError(res, err);
                  }
                  res.status(201);
                  res.send(editedPlaylist);
                });
              }
            );
          })
          .catch(function (err) {
            res.status(405).send('Could not remove track from playlist: ' + err);
          });
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  /**
   * Edit the local information of a playlist
   */
  app.put('/playlist/:playlistid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var playlistID = req.params.playlistid;
    db.collection('playlists').updateOne({
        _id: new ObjectID(playlistID),
        author: new ObjectID(fromUser)
      }, {
        $set: {
          title: req.body.name,
          game: req.body.game,
          genre: req.body.genre,
          description: req.body.description
        }
      }, function (err, result) {
        if (err) {
          return sendDatabaseError(res, err);
        } else if (result.modifiedCount === 0) {
          return res.status(400).send("Unable to modify playlist: " + result);
        }
        getPlaylist(new ObjectID(playlistID), function(err, playlist) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          res.send(playlist);
        });
      }
    );
  });

  /**
   * Delete a playlist from BBQForte.
   * This does not affect Spotify.
   */
  app.delete('/playlist/:playlistid', function (req, res) {
    var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
    var playlistID = new ObjectID(req.params.playlistid);

    db.collection('playlists').findOne({
      _id: playlistID,
      author: fromUser
    }, function (err, playlist) {
      if (err) {
        return sendDatabaseError(res, err);
      } else if (playlist === null) {
        return res.status(400).send("Playlist not found: ");
      }

      db.collection('playlist-feeds').updateMany({}, {
        $pull: {
          contents: playlistID
        }
      }, function(err) {
        if (err) {
          return sendDatabaseError(res, err);
        }
        db.collection('playlists').deleteOne({
          _id: playlistID
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          res.send();
        });
      });
    });
  });

  /**
   * Adds a vote for a particular user
   */
  app.put('/playlist/:playlistid/votes/:userid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var playlistID = new ObjectID(req.params.playlistid);
    var userId = req.params.userid;
    if (fromUser === userId) {
      db.collection('playlists').updateOne({ _id: playlistID },
        {
          $addToSet: {
            votes: new ObjectID(userId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          db.collection('playlists').findOne({ _id: playlistID }, function(err, playlist) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(playlist.votes);
            // resolveUserObjects(playlist.votes, function(err, userMap) {
            //   if (err) {
            //     return sendDatabaseError(res, err);
            //   }
            //   res.send(playlist.votes.map((userId) => userMap[userId]));
            // });
          });
        }
      );
    } else {
      res.status(401).end();
    }
  });

  /**
   * Removes a vote from a playlist for a particular user.
   */
  app.delete('/playlist/:playlistid/votes/:userid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var playlistID = new ObjectID(req.params.playlistid);
    var userId = req.params.userid;
    if (fromUser === userId) {
      db.collection('playlists').updateOne({ _id: playlistID },
        {
          $pull: {
            votes: new ObjectID(userId)
          }
        }, function(err) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          db.collection('playlists').findOne({ _id: playlistID }, function(err, playlist) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(playlist.votes);
            // resolveUserObjects(playlist.votes, function(err, userMap) {
            //   if (err) {
            //     return sendDatabaseError(res, err);
            //   }
            //   res.send(playlist.votes.map((userId) => userMap[userId]));
            // });
          });
        }
      );
    } else {
      res.status(401).end();
    }
  });

  /*
   *    ********* END of PLAYLIST functions
   */

  /*
   * Returns the Carousel object
   */
  app.get('/carousel/', function (req, res) {
    var carouselData = readDocument('carousel', 1);
    res.send(carouselData);
  });

  /*
   * Returns the NewsUpdates object
   */
  app.get('/news-updates/', function (req, res) {
    var newsData = readDocument('newsUpdates', 1);
    res.send(newsData);
  });


  /*
   * Returns the RecentConversations object
   */
  app.get('/private-chat/recent/:userID', function (req, res) {
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
  app.post('/private-chat/recent/:userID/add/:otherUserID', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userID = parseInt(req.params.userID, 10);
    var otherUserID = parseInt(req.params.otherUserID, 10);

    if (userID === fromUser) {
      var recentChatData = readDocument('recent-conversations', userID);

      if (recentChatData.userList.indexOf(otherUserID) === -1) {
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
  app.delete('/private-chat/recent/:userID/remove/:otherUserID', function (req, res) {
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
  app.get('/private-chat/live-help/:userID', function (req, res) {
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
  app.get('/private-chat/conversations/:userID', function (req, res) {
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
  app.post('/private-chat/conversations/:userID/create-chat/:otherUserID', function (req, res) {
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
  app.post('/private-chat/conversations/:userID/chat-with/:otherUserIndex', validate({body: chatMessageSchema}), function (req, res) {
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
  app.put('/private-chat/switch/:userID/to/:otherUserID', function (req, res) {
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
  function getTopCategory(compare) {
    var playlistsJSON = getCollection('playlists');
    // converting playlistsJSON to an array of JSON
    var playlists = [];
    for (var x in playlistsJSON) {
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
    for (var i = 0; i < playlists.length && i < 8; i++) {
      var index = indexOfGame(playlists[i].game, newCategory.contents);
      if (index == -1) {
        var newSection = {
          "imageURL": playlists[i].imageURL,
          "gameTitle": playlists[i].game,
          "playlists": [playlists[i]._id]
        };
        newCategory.contents.push(newSection);
      } else {
        newCategory.contents[index].playlists.push(playlists[i]._id);
      }
    }
    return newCategory;
  }

  /*
   * Returns the index of gameTitle (string) within contents (array) in MostPopular JSON
   */
  function indexOfGame(gameTitle, contents) {
    for (var i = 0; i < contents.length; i++) {
      if (contents[i].gameTitle.toLowerCase() == gameTitle.toLowerCase())
        return i;
    }
    return -1;
  }

  /*
   * Returns the MostPopular object
   */
  app.get('/most-popular/', function (req, res) {
    var mostPopularData = getTopCategory(function (a, b) {
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
  app.get('/highest-rated/', function (req, res) {
    var highestRatedData = getTopCategory(function (a, b) {
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
  function getRising() {
    var playlistsJSON = getCollection('playlists');
    // converting playlistsJSON to an array of JSON
    var playlists = [];
    var rising = [];
    for (var x in playlistsJSON) {
      playlists.push(playlistsJSON[x]);
    }
    // sorting playlists
    playlists.sort(function (a, b) {
      return b.votes.length - a.votes.length;
    });
    for (var i = 0; i < playlists.length && rising.length < 8; i++) {
      var year = new Date().getUTCFullYear();
      var playlistYear = new Date(playlists[i].timestamp).getUTCFullYear();
      console.log("yaer:" + year + " - " + "playlistYear: " + playlistYear);
      if (year - playlistYear <= 1) {
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
    for (var j = 0; j < rising.length && j < 8; j++) {
      var index = indexOfGame(rising[j].game, newCategory.contents);
      if (index == -1) {
        var newSection = {
          "imageURL": rising[j].imageURL,
          "gameTitle": rising[j].game,
          "playlists": [rising[j]._id]
        };
        newCategory.contents.push(newSection);
      } else {
        newCategory.contents[index].playlists.push(rising[j]._id);
      }
    }
    return newCategory;
  }

  /*
   * Returns the Rising object
   */
  app.get('/rising/', function (req, res) {
    var risingData = getRising();
    risingData.contents.forEach((n) => {
      n.playlists = n.playlists.map(getPlaylistWithAuthor)
    });
    res.send(risingData);
  });

  /*
   * Returns the NewRelease object
   */
  app.get('/new-release/', function (req, res) {
    var newReleaseData = getTopCategory(function (a, b) {
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
  app.get('/forum/', function (req, res) {
    var forumData = readDocument('forums', 1);
    res.send(forumData);
  });

  /*
   * Returns the Topics object
   */
  app.get('/forum/category/:category/topic/:topicID', function (req, res) {
    var forumData = readDocument('forums', 1);
    var topic = forumData.categories[parseInt(req.params.category)].topics[parseInt(req.params.topicID)];
    res.send(topic);
  });


  /*
   * Adds a Thread object
   */

  function postThread(category, topicId, title, author, contents) {
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

  app.post('/forum/category/:category/topic/:topicId/newTopic', function (req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser == body.author) {
      postThread(req.params.category, req.params.topicId, body.title, body.author, body.contents)
      res.status(201);
    }
    else {
      res.status(401).end();
    }
  });

  /*
   * Adds a Comment object
   */

  function postComment(user, category, topicID, threadID, contents) {
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
    forumData.categories[category].topics[topicID].threads[threadID].postCount = forumData.categories[category].topics[topicID].threads[threadID].postCount + 1;
    writeDocument('forums', forumData);
  }

  app.post('/forum/category/:category/topic/:topicId/thread/:threadid', function (req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser == body.author) {
      postComment(body.author, body.category, body.topicId, body.threadId, body.contents)
      res.status(201);
    }
    else {
      res.status(401).end();
    }
  });


  /**
   * Reset the database
   */
  app.post('/resetdb', function (req, res) {
    console.log("Resetting the database...");
    ResetDatabase(db, function() {
      res.send();
    });
  });

  /**
   * Translate JSON Schema Validation failures into error 400s.
   */
  app.use(function (err, req, res, next) {
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
  app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
  });

});