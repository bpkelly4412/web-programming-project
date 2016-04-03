
var express = require('express');
var app = express();

var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;

//  Schema properties
var playlistSchema = require('./schemas/playlist_schema.json');
var songSchema = require('./schemas/song_schema.json');

app.use(express.static('../client/build'));
app.use(bodyParser.text());
app.use(bodyParser.json());

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
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
 */
function getPlaylist(playlistID) {
  var playlist = readDocument('playlists', playlistID);
  // playlist.contents = playlist.songs.map(getSong);
  return playlist;
}

/**
 * Post a new playlist
 */
app.post('/playlist', validate({body: playlistSchema}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if (fromUser === body.userID) {
    var newPlaylist = createNewPlaylist(body.author, body.title, body.game, body.genre, body.description);
    res.status(201);
    res.send(newPlaylist);
  } else {
    res.status(401).end();
  }
});

/**
 * Creates a new, empty playlist
 */
function createNewPlaylist(author, title, game, genre, description) {
  var user = readDocument('users', author);
  var newPlaylist = {
    "game": game,
    "imageURL": "",
    "title": title,
    "author": author,
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
