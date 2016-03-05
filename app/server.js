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
* Adds a song to a playlist
*/
export function addSong(playlistID, songID, cb) {
  var playlist = readDocument('playlists', playlistID);
  playlist.songs.push(songID);
  writeDocument('playlists', playlist);
  emulateServerReturn(getPlaylist(playlistID), cb);
}

/**
* Removes a song from a playlist
*/
export function removeSong(playlistID, songID, cb) {
  var playlist = readDocument('playlists', playlistID);
  playlist.contents = [];
  var songIndex = playlist.songs.indexOf(songID);
  if (songIndex !== -1) {
    playlist.songs.splice(songIndex, 1);
    playlist.contents.splice(songIndex, 1);
    writeDocument('playlists', playlist)
  }
  emulateServerReturn(getPlaylist(playlistID), cb);
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

/**
* This will likely need to be moved? I am just performing a GET from Spotify's song database.
*/
export function getSongList(searchData, cb) {
  var searchURL = "https://api.spotify.com/v1/search";
  var songList = [];
  searchURL = searchURL + "?q=" + searchData + "&type=track";
  // searchURL = searchURL + "?q=" + "Hans Zimmer" + "&type=track";
  httpGetAsync(searchURL, (newSong) => {
    var resultsList = JSON.parse(newSong);
    for (var i = 0; i < resultsList.tracks.items.length; i++) {
      var nextItem = resultsList.tracks.items[i]
      var song = {title: "", artist: "", album: "", url: ""};
      song.title = nextItem.name;
      if (nextItem.artists.length > 0) {
        song.artist = nextItem.artists[0].name;
      } else {
        song.artist = "Unknown";
      }
      song.album = nextItem.album.name;
      song.url = nextItem.external_urls.spotify;
      songList.push(song);
    }
    // console.log(songList);
    emulateServerReturn(songList, cb);
  })
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
