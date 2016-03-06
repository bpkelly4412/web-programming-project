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
      "playlistfeed": 1
    },
    "2": {
      "_id": 2,
      "userName": "Ned Stark",
      "playlistfeed": 2
    },
    "3": {
      "_id": 3,
      "userName": "Tyrion Lannister",
      "playlistfeed": 3
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
          "title": "New Releases",
          "contents": "Playlists have been added for the new releases Blade and Soul, Rise of the Tomb Raider, and more!",
          "publishDate": "2.6.2016"
        },
        {
          "title": "Horror Playlist Update",
          "contents": "You asked. We delivered. We have updated our horror section to include playlists with creepy children!",
          "publishDate": "1.26.2016"
        },
        {
          "title": "New Releases",
          "contents": "Playlists have been added for the new releases Wick, Life is Strange, and more!",
          "publishDate": "1.20.2016"
        },
        {
          "title": "Genre Update: Rock",
          "contents": "We have updated our rock music section with several new playlists.",
          "publishDate": "1.3.2016"
        },
        {
          "title": "Site Maintenance",
          "contents": "The website will be down for maintenance on 12.23.2016 at 3:00 A.M. EST and should take approximately 2 hours.",
          "publishDate": "12.22.2015"
        },
        {
          "title": "New Releases",
          "contents": "Playlists have been added for the new releases Just Cause 3, Fallout 4, and more!",
          "publishDate": "12.13.2015"
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
