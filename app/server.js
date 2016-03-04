import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

/**
* Given a song ID returns a Song object.
*/
function getSong(songID) {
  var song = readDocument('songs', songID);
  return song;
}
/**
* Given a playlist ID returns a Playlist object.
*/
function getPlaylist(playlistID) {
  var playlist = readDocument('playlists', playlistID);
  playlist.contents = playlist.songs.map(getSong);
  return playlist;
}

/**
* Given a playlist ID (for now), returns a Playlist object.
*/
export function getUserData(userID, cb) {
  var userData = readDocument('users', userID);
  emulateServerReturn(userData, cb);
}

/**
* Given a playlist ID (for now), returns a Playlist object.
*/
export function getPlaylistFeed(userID, cb) {
  var userData = readDocument('users', userID);
  var playlistfeed = readDocument('playlist-feeds', userData.playlistfeed);
  playlistfeed.contents = playlistfeed.contents.map(getPlaylist);
  emulateServerReturn(playlistfeed, cb);
}
