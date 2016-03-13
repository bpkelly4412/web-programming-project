import {readDocument, writeDocument, addDocument, readPlaylist } from './database.js';

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
* Given a user ID (for now), returns a UserData object.
*/
export function getUserData(userID, cb) {
  var userData = readDocument('users', userID);
  emulateServerReturn(userData, cb);
}

export function setUserData(data, cb) {
    var userData = writeDocument('users', data);
    emulateServerReturn(userData, cb);
}

/**
* Given a user ID (for now), returns a PlaylistFeed object.
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

/*export function getMostPopular(cb) {
  var playlists = readPlaylist('playlists');
  var arr = [];
  for (var attr in playlists){
    arr.push(playlists[attr])
  }


  emulateServerReturn(mostPopularData, cb);
}*/

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
*/
export function searchPlaylist(terms, cb) {
  var playlists = readPlaylist('playlists');
  var arr = [];
  var result = [];
  for (var attr in playlists){
    arr.push(playlists[attr])
  }

  outer:
  for (var i = 0; i < arr.length; i++){
    for (var x in arr[i]){
      if(x === "game" || x === "title" || x === "genre" || x === "description"){
        //console.log(typeof arr[i][x]);
        if(arr[i][x].includes(terms)){
          result.push(arr[i]);
          continue outer;
        }
      }
    }
  }
  emulateServerReturn(result, cb);
}



/**
* Given a user ID (for now), returns a PrivateChatLiveHelp object.
*/
export function getLiveHelpList(userID, cb) {
  var liveHelpData = readDocument('liveHelp', userID);
  liveHelpData.contents.forEach((category) => {
    category.userList = category.userList.map((id) => readDocument('users', id))
  });
  emulateServerReturn(liveHelpData, cb);
}

/**
* Given a user ID (for now), returns a RecentConversations object. Also adds otherUserID to the user list if not found.
*/
export function getRecentConversations(userID, otherUserID, cb) {
  var recentConversations = readDocument('recent-conversations', userID);
  var contains = false;

  for(var i = 0; i < recentConversations.userList.length; i++) {
    if (recentConversations.userList[i] === otherUserID) {
      contains = true;
      break;
    }
  }

  if(contains === false) {
    recentConversations.userList.push(otherUserID);
    writeDocument('recent-conversations', userID);
  }

  var newRecentConversations = readDocument('recent-conversations', userID);
  //console.log(newRecentConversations);
  newRecentConversations.userList = newRecentConversations.userList.map((id) => readDocument('users', id))
  emulateServerReturn(newRecentConversations, cb);
}

/**
* Given a user ID (for now), returns a PrivateChatConversation object.
*/
export function getChatConversations(userID, cb) {
  var conversationsData = readDocument('conversations', userID);
  conversationsData.chatlogs.forEach((chatlog) => {
    chatlog.otherUser = readDocument('users', chatlog.otherUser);

    chatlog.messages.forEach((message) => {
      message.author = readDocument('users', message.author);
    })
  });
  emulateServerReturn(conversationsData, cb);
}

/**
* Adds a new message to the messages array of a user's chatlogs in 'conversations'
*/
export function sendMessage(userID, otherUserIndex, contents, cb) {
  var conversationsData = readDocument('conversations', userID);
  conversationsData.chatlogs[otherUserIndex].messages.push({
    "author": userID,
    "content": contents
  })
  writeDocument('conversations', conversationsData);

  return getChatConversations(userID, cb);
}

/**
* Adds a new conversation (chatlog entry in chatlogs index) for a user in 'conversations'
*/
export function createNewChatlog(userID, otherUserID, cb) {
  var conversationsData = readDocument('conversations', userID);
  conversationsData.chatlogs.push({
    "_id": conversationsData.chatlogs.length-1,
    "otherUser": otherUserID,
    "messages": []
  })
  writeDocument('conversations', conversationsData);

  return getChatConversations(userID, cb);
}

/**
* Removes an entry in a user's Recent Conversations menu
*/
export function removeRecentChat(userID, otherUserID, cb) {
  var recentChatData = readDocument('recent-conversations', userID);
  var userIndex = recentChatData.userList.indexOf(otherUserID);
  recentChatData.userList.splice(userIndex, 1);
  writeDocument('recent-conversations', recentChatData);

  emulateServerReturn(recentChatData.userList.map((userID) => readDocument('users', userID)), cb);
}

/**
* Switches the chat box to display a conversation with a different user
*/
export function updateChattingWith(userID, otherUserID, cb) {
  var userData = readDocument('users', userID);
  userData.chattingWith = otherUserID;
  writeDocument('users', userData);

  emulateServerReturn(userData, cb);
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
