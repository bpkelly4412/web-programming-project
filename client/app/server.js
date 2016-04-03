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

var token = 'eyJpZCI6MX0=';
/**
 *  Properly configure and send an XMLHttpRequest with error handling,
 *  authorization handling, and other needed properties
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  /* global FacebookError */
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      cb(xhr);
    } else {
      var responseText = xhr.responseText;
      BBQError('Could not ' +
        verb + " " +
        resource + ": Received " +
        statusCode + " " +
        statusText + ": " +
        responseText);
    }
  });
  xhr.timeout = 10000;
  xhr.addEventListener('error', function() {
    BBQError("Could not " +
      verb + " " +
      resource + ": Could not connect to the server.");
  });
  xhr.addEventListener('timeout', function() {
    BBQError("Could not " +
      verb + " " +
      resource + ": Request timed out.");
  });
  switch (typeof (body)) {
    case 'undefined':
      xhr.send();
      break;
    case 'string':
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error("Unknown body type: " + typeof(body));
  }
}

//  ********* Playlist Functions ************

/**
 * Given a user ID (for now), returns a PlaylistFeed object.
 */
export function getPlaylistFeed(userID, cb) {
  sendXHR('GET', '/user/' + userID + '/playlists', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
* Adds a song to a playlist
*/
export function createNewPlaylist(author, title, game, genre, description, cb) {
  sendXHR('POST', '/playlist', {
    userID: author,
    author: author,
    title: title,
    game: game,
    genre: genre,
    description: description
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
* Removes a song from a playlist
*/
export function removePlaylist(playlistID, cb) {
  sendXHR('DELETE', '/playlist/' + playlistID, undefined, () => {
    cb();
  });
}

/**
* Updates a playlist's votes by adding the userID.
*/
export function votePlaylist(playlistID, userId, cb) {
  sendXHR('PUT', '/playlist/'+playlistID+'/votes/'+userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
* Updates a playlist's votes by removing the userID.
*/
export function unvotePlaylist(playlistID, userId, cb) {
  sendXHR('DELETE', '/playlist/'+playlistID+'/votes/'+userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
* Adds a song to a playlist
*/
export function addSong(playlistID, userID, song, cb) {
  sendXHR('PUT', '/playlist/' + playlistID + '/songs/' + userID, {
    spotify_id: song.spotify_id,
    title: song.title,
    artist: song.artist,
    album: song.album,
    uri: song.uri,
    duration: song.duration
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
* Removes a song from a playlist
*/
export function removeSong(playlistID, songIndex, cb) {
  console.log(playlistID);
  sendXHR('DELETE', '/playlist/' + playlistID + '/songs/' + songIndex, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
*with callback to use for profile page
*/
export function getPlaylistCB(playlistID, cb) {
  var playlist = readDocument('playlists', playlistID);
  // playlist.contents = playlist.songs.map(getSong);
  emulateServerReturn(playlist, cb);
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

export function useRecommendation(userID, key, cb) {
    var userData = readDocument('users', userID);
    userData.recommendations = userData.recommendations.filter(recommendation => recommendation._id !== key);
    writeDocument('users', userData);
    emulateServerReturn(userData, cb);
}

/**
* Returns a Topic object.
*/
export function getTopic(topicID, cb ) {
  var forumData = readDocument('forums', 1);
  var topic = forumData.topics[topicID];
  // playlist.contents = playlist.songs.map(getSong);
  emulateServerReturn(topic, cb);
}

/**
* Returns a Forum object.
*/
export function getForum(cb) {
  var forumData = readDocument('forums', 1);
  emulateServerReturn(forumData, cb);
}

export function postThread(user, topicID, title, contents, cb) {


  var time = new Date().getTime();

  var newThread = {
    "title": title,
    "postCount": [0],
    "posts": [
      {
        "_id": 1,
        "author": user,
        "postDate": time,
        "contents": contents
      }
    ]
  };

  var forumData = readDocument('forums', 1);
  var topic = forumData.topics[topicID];
  newThread = addDocument(topic, newThread);

  // Return the newly-posted object  emulateServerReturn(newThread, cb);
  emulateServerReturn(newThread, cb);
}

export function postComment( user, topicID, threadID, contents, cb) {

  // Get the current UNIX time.
  var time = new Date().getTime();
  // The new status update. The database will assign the ID for us.
  var newPost = {
        "author": user,
        "postDate": time,
        "contents": contents
      };

  // Add the new Thread to the database.
  // Returns the new Thread w/ an ID assigned.
  var forumData = readDocument('forums', 1);
  var topic = forumData.topics[topicID];
  var thread = topic[threadID].thread
  newPost = addDocument(thread.posts, newPost);

  // Return the newly-posted object.
  emulateServerReturn(newPost, cb);
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
        if(arr[i][x].toLowerCase().includes(terms.toLowerCase())){
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

  recentConversations.userList = recentConversations.userList.map((id) => readDocument('users', id))
  emulateServerReturn(recentConversations, cb);
}

export function addRecentChat(userID, otherUserID, cb) {
  var recentChatData = readDocument('recent-conversations', userID);

  if(recentChatData.userList.indexOf(otherUserID) === -1) {
    recentChatData.userList.push(otherUserID);
    writeDocument('recent-conversations', recentChatData);
  }

  emulateServerReturn(recentChatData.userList.map((userID) => readDocument('users', userID)), cb);
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
