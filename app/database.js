import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "BBQ Forte";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
    "1": {
      "_id": 1,
      "userName": "Jon Snow",
      "playlistfeed": 1,
      "status": "online"
    },
    "2": {
      "_id": 2,
      "userName": "Ned Stark",
      "playlistfeed": 2,
      "status": "online"
    },
    "3": {
      "_id": 3,
      "userName": "Tyrion Lannister",
      "playlistfeed": 3,
      "status": "online"
    },
    "4": {
      "_id": 4,
      "userName": "Rock Expert 1",
      "playlistfeed": 4,
      "status": "online"
    },
    "5": {
      "_id": 5,
      "userName": "Rock Expert 2",
      "playlistfeed": 5,
      "status": "online"
    },
    "6": {
      "_id": 6,
      "userName": "Rock Expert 3",
      "playlistfeed": 6,
      "status": "away"
    },
    "7": {
      "_id": 7,
      "userName": "Rock Expert 4",
      "playlistfeed": 7,
      "status": "away"
    },
    "8": {
      "_id": 8,
      "userName": "Electronic Expert 1",
      "playlistfeed": 8,
      "status": "online"
    },
    "9": {
      "_id": 9,
      "userName": "Electronic Expert 2",
      "playlistfeed": 9,
      "status": "online"
    },
    "10": {
      "_id": 10,
      "userName": "Electronic Expert 3",
      "playlistfeed": 10,
      "status": "away"
    },
    "11": {
      "_id": 11,
      "userName": "Ambient Expert 1",
      "playlistfeed": 11,
      "status": "online"
    },
    "12": {
      "_id": 12,
      "userName": "Ambient Expert 2",
      "playlistfeed": 12,
      "status": "online"
    },
    "13": {
      "_id": 13,
      "userName": "Metal Expert 1",
      "playlistfeed": 13,
      "status": "away"
    },
    "14": {
      "_id": 14,
      "userName": "Metal Expert 2",
      "playlistfeed": 14,
      "status": "away"
    },
    "15": {
      "_id": 15,
      "userName": "Hip-Hop Expert 1",
      "playlistfeed": 15,
      "status": "online"
    },
    "16": {
      "_id": 16,
      "userName": "Hip-Hop Expert 2",
      "playlistfeed": 16,
      "status": "online"
    },
    "17": {
      "_id": 17,
      "userName": "Hip-Hop Expert 3",
      "playlistfeed": 17,
      "status": "away"
    },
    "18": {
      "_id": 18,
      "userName": "Indie Expert 1",
      "playlistfeed": 18,
      "status": "away"
    }
  },
  "playlist-feeds": {
    "1": {
      "_id": 1,
      "contents": [101, 102]
    },
    "2": {
      "_id": 2,
      "contents": [102]
    },
    "3": {
      "_id": 3,
      "contents": [101]
    }
  },
  "playlists": {
    "101": {
      "_id": 101,
      "game": "Elite Dangerous",
      "imageURL": "img/elite-dangerous.jpg",
      "title": "Music for Space Travel",
      "author": 1,
      "votes": [1, 3],
      "genre": "Classical",
      "description": "Epic orchestra music.",
      "url": "TBD",
      "songs": [
        {
          "title": "Flight",
          "artist": "Hans Zimmer",
          "album": "Man of Steel (Original Motion Picture Soundtrack)",
          "duration": 5000,
          "url": "TBD"
        },
        {
          "title": "Requiem (for String Orchestra)",
          "artist": "Takemitsu",
          "album": "Takemitsu: Orchestral Works",
          "duration": 5000,
          "url": "TBD"
        },
        {
          "title": "Summa",
          "artist": "Arvo Pärt",
          "album": "The Very Best of Arvo Pärt",
          "duration": 5000,
          "url": "TBD"
        },
        {
          "title": "Morag",
          "artist": "Tyler Bates",
          "album": "Guardians of the Galaxy (Original Score)",
          "duration": 5000,
          "url": "TBD"
        }
      ]
    },
    "102": {
      "_id": 102,
      "game": "Fallout 4",
      "imageURL": "img/fallout4.jpg",
      "title": "Rockin Space shooty rock",
      "author": 1,
      "votes": [2],
      "genre": "Rock",
      "description": "Hard Rock tracks to shoot spaceships to",
      "url": "TBD",
      "songs": [
        {
          "title": "Rock Song Woohoo",
          "artist": "Band",
          "album": "Band's Cool Album",
          "duration": 5000,
          "url": "TBD"
        },
        {
          "title": "Another Rock Song",
          "artist": "Another Band",
          "album": "Another Band Live",
          "duration": 5000,
          "url": "TBD"
        },
        {
          "title": "The Twist",
          "artist": "Chubby Checkers",
          "album": "50's Classics",
          "duration": 5000,
          "url": "TBD"
        }
      ]
    }
  },
  "newsUpdates": {
    "1": {
      "_id": 1,
      "newsEntries": [
        {
          "_id": 1,
          "title": "New Releases",
          "contents": "Playlists have been added for the new releases Blade and Soul, Rise of the Tomb Raider, and more!",
          "publishDate": "2.6.2016"
        },
        {
          "_id": 2,
          "title": "Horror Playlist Update",
          "contents": "You asked. We delivered. We have updated our horror section to include playlists with creepy children!",
          "publishDate": "1.26.2016"
        },
        {
          "_id": 3,
          "title": "New Releases",
          "contents": "Playlists have been added for the new releases Wick, Life is Strange, and more!",
          "publishDate": "1.20.2016"
        },
        {
          "_id": 4,
          "title": "Genre Update: Rock",
          "contents": "We have updated our rock music section with several new playlists.",
          "publishDate": "1.3.2016"
        },
        {
          "_id": 5,
          "title": "Site Maintenance",
          "contents": "The website will be down for maintenance on 12.23.2016 at 3:00 A.M. EST and should take approximately 2 hours.",
          "publishDate": "12.22.2015"
        },
        {
          "_id": 6,
          "title": "New Releases",
          "contents": "Playlists have been added for the new releases Just Cause 3, Fallout 4, and more!",
          "publishDate": "12.13.2015"
        }
      ]
    }
  },
  "carousel": {
    "1": {
      "_id": 1,
      "contents": [
        {
          "active": "item active",
          "imgURL": "img/steam_banner.png",
          "altURL": "Steam Banner",
          "description": "Sync your Steam library to BBQ Forte!"
        },
        {
          "active": "item",
          "imgURL": "img/blade_and_soul_banner.png",
          "altURL": "Blade and Soul Banner",
          "description": "Check out playlists for the new release Blade and Soul"
        },
        {
          "active": "item",
          "imgURL": "img/ori_banner.png",
          "altURL": "Ori Banner",
          "description": "Browse popular single-player game playlists"
        },
        {
          "active": "item",
          "imgURL": "img/civ_v_banner.png",
          "altURL": "Civ V Banner",
          "description": "Listen to the top-rated playlists for Civ V"
        },
        {
          "active": "item",
          "imgURL": "img/i_am_bread_banner.png",
          "altURL": "I am Bread Banner",
          "description": "Even bread needs some great music! Check out these playlists"
        }
      ]
    }
  },
  "liveHelp": {
    "1": {
      "_id": 1,
      "contents": [
        {
          "genre": "Rock",
          "userList": [4, 5, 6, 7]
        },
        {
          "genre": "Electronic",
          "userList": [8, 9, 10]
        },
        {
          "genre": "Ambient",
          "userList": [11, 12]
        },
        {
          "genre": "Metal",
          "userList": [13, 14]
        },
        {
          "genre": "Hip-Hip",
          "userList": [15, 16, 17]
        },
        {
          "genre": "Indie",
          "userList": [18]
        }
      ]
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
* A dumb cloning routing. Serializes a JSON object as a string, then
* deserializes it.
*/
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
* Emulates reading a "document" from a NoSQL database.
* Doesn't do any tricky document joins, as we will cover that in the latter
* half of the course. :)
*/
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
* Emulates writing a "document" to a NoSQL database.
*/
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
* Adds a new document to the NoSQL database.
*/
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
* Reset our browser-local database.
*/
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
* Reset database button.
*/
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
          resetDatabase();
          window.alert("Database reset! Refreshing the page now...");
          document.location.reload(false);
        }}>Reset Mock DB</button>
      );
    }
  }

  ReactDOM.render(
    <ResetDatabase />,
    document.getElementById('db-reset')
  );
