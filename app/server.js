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
* Adds a song to a playlist
*/
export function createNewPlaylist(userID, name, game, genre, description, cb) {
  var user = readDocument('users', userID);
  var newPlaylist = {
    "game": game,
    "imageURL": "",
    "title": name,
    "author": userID,
    "votes": [],
    "genre": genre,
    "description": description,
    "url": "TBD",
    "songs": []
  };
  newPlaylist = addDocument('playlists', newPlaylist);
  var playerPlaylists = readDocument('playlist-feeds', user.playlistfeed);
  playerPlaylists.contents.unshift(newPlaylist._id);
  writeDocument('playlist-feeds', playerPlaylists);
  emulateServerReturn(newPlaylist._id, cb);
}

/**
* Removes a song from a playlist
*/
export function removePlaylist(userID, playlistFeedID, playlistID, cb) {
  var playlistfeed = readDocument('playlist-feeds', playlistFeedID);
  var playlistFeedIndex = playlistfeed.contents.indexOf(playlistID);
  if (playlistFeedIndex !== -1) {
    playlistfeed.contents.splice(playlistFeedIndex, 1);
    writeDocument('playlist-feeds', playlistfeed);
    playlistfeed.contents = playlistfeed.contents.map(getPlaylist);
  }
  emulateServerReturn(playlistfeed, cb);
}

/**
* Updates a playlist's votes by adding the userID.
*/
export function votePlaylist(playlistID, userId, cb) {
  var playlist = readDocument('playlists', playlistID);
  playlist.votes.push(userId);
  writeDocument('playlists', playlist);
  emulateServerReturn(playlist.votes, cb);
}

/**
* Updates a playlist's votes by removing the userID.
*/
export function unvotePlaylist(playlistID, userId, cb) {
  var playlist = readDocument('playlists', playlistID);
  var userIndex = playlist.votes.indexOf(userId);
  if (userIndex !== -1) {
    playlist.votes.splice(userIndex, 1);
    writeDocument('playlists', playlist);
  }
  emulateServerReturn(playlist.votes, cb);
}

/**
* Adds a song to a playlist
*/
export function addSong(playlistID, song, cb) {
  var playlist = readDocument('playlists', playlistID);
  playlist.songs.push(song);
  writeDocument('playlists', playlist);
  emulateServerReturn(getPlaylist(playlistID), cb);
}

/**
* Removes a song from a playlist
*/
export function removeSong(playlistID, songIndex, cb) {
  var playlist = readDocument('playlists', playlistID);
  if (songIndex !== -1) {
    playlist.songs.splice(songIndex, 1);
    // playlist.contents.splice(songIndex, 1);
    writeDocument('playlists', playlist)
  }
  emulateServerReturn(getPlaylist(playlistID), cb);
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
* Given a playlist ID returns a Playlist object.
* Might considering merging with getPlaylist(playlistID)
*/
function getPlaylistWithAuthor(playlistID) {
  var playlist = readDocument('playlists', playlistID);
  var userID = playlist.author;
  playlist.author = readDocument('users', userID).userName
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
* Returns a Topics object.
*/
export function getTopics(cb) {
  var topicData = readDocument('topics', 101);
  emulateServerReturn(topicData, cb);
}

/**
* Returns a NewsUpdates object.
*/
export function getNewsUpdates(cb) {
  var newsData = readDocument('newsUpdates', 1);
  emulateServerReturn(newsData, cb);
}

/**
* Returns a GameCarousel object.
*/
export function getCarousel(cb) {
  var carouselData = readDocument('carousel', 1);
  emulateServerReturn(carouselData, cb);
}

/**
* Returns a NewRelease object
*/
export function getNewRelease(cb) {
  var newReleaseData = readDocument('newRelease', 1);
  newReleaseData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  emulateServerReturn(newReleaseData, cb);
}

/**
* Returns a MostPopular object
*/
export function getMostPopular(cb) {
  var mostPopularData = readDocument('mostPopular', 1);
  mostPopularData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  emulateServerReturn(mostPopularData, cb);
}

/**
* Returns a HighestRated object
*/
export function getHighestRated(cb) {
  var highestRatedData = readDocument('highestRated', 1);
  highestRatedData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  emulateServerReturn(highestRatedData, cb);
}

/**
* Returns a Rising object
*/
export function getRising(cb) {
  var risingData = readDocument('rising', 1);
  risingData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  emulateServerReturn(risingData, cb);
}

/**
* Returns a search result object

export function getSearchResult(cb) {
  var searchResult = readDocument('mock-search-result', 1);
  risingData.contents.forEach((n) => {
    n.playlists = n.playlists.map(getPlaylistWithAuthor)
  });
  emulateServerReturn(searchResult, cb);
}*/

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
