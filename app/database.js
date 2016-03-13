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
    },
    "103": {
      "_id": 103,
      "game": "Fallout 4",
      "imageURL": "img/fallout4.jpg",
      "title": "Boston Jams",
      "author": 1,
      "votes": [2],
      "genre": "Pop",
      "description": "Thematic music about Boston",
      "url": "TBD",
      "songs": []
    },
    "104": {
      "_id": 104,
      "game": "Fallout 4",
      "imageURL": "img/fallout4.jpg",
      "title": "Swinging It",
      "author": 1,
      "votes": [2],
      "genre": "Pop",
      "description": "Classic atmospheric 1950's music.",
      "url": "TBD",
      "songs": []
    },
    "105": {
      "_id": 105,
      "game": "Fallout 4",
      "imageURL": "img/fallout4.jpg",
      "title": "HEAVY METAL THUNDER",
      "author": 1,
      "votes": [2],
      "genre": "Heavy Metal",
      "description": "Heavy metal sounds for your heavy metal powersuit",
      "url": "TBD",
      "songs": []
    },
    "106": {
      "_id": 106,
      "game": "Fallout 4",
      "imageURL": "img/fallout4.jpg",
      "title": "I don't know",
      "author": 1,
      "votes": [2],
      "genre": "N/A",
      "description": "It has music, I think",
      "url": "TBD",
      "songs": []
    },
    "107": {
      "_id": 107,
      "game": "Elite Dangerous",
      "imageURL": "img/elite-dangerous.jpg",
      "title": "Rockin' space shooty rock",
      "author": 1,
      "votes": [2],
      "genre": "N/A",
      "description": "Hard Rock tracks to shoot spaceships to",
      "url": "TBD",
      "songs": []
    },
    "108": {
      "_id": 108,
      "game": "Elite Dangerous",
      "imageURL": "img/elite-dangerous.jpg",
      "title": "Chill space mining trance",
      "author": 1,
      "votes": [2],
      "genre": "N/A",
      "description": "Just Chill",
      "url": "TBD",
      "songs": []
    },
    "109": {
      "_id": 109,
      "game": "Elite Dangerous",
      "imageURL": "img/elite-dangerous.jpg",
      "title": "Space Piracy",
      "author": 1,
      "votes": [2],
      "genre": "N/A",
      "description": "The best of modern Pirate Metal and Pirate Rap for all your space pirate needs.",
      "url": "TBD",
      "songs": []
    },
    "110": {
      "_id": 110,
      "game": "Elite Dangerous",
      "imageURL": "img/elite-dangerous.jpg",
      "title": "We can't stop here. This is space country.",
      "author": 1,
      "votes": [2],
      "genre": "N/A",
      "description": "It's classic country goodness. IN SPACE.",
      "url": "TBD",
      "songs": []
    }
  },
  "forums": {
    "1": {
      "_id": 1,
      "topics": [
        {
      "_id": 1,
      "title": "General Forte Discussion",
      "threadCount": [2],
      "postCount": [2],
      "threads": [
        {
          "_id": 1,
          "title": "First Thread",
          "postCount": [1],
          "posts": [
            {
            "_id": 1,
            "author": 1,
            "postDate": 1453668480000,
            "contents": "Aut si rem a me pecuniam in Midiam elit. Nec ego in imperio elit. Id quod sum sub potestate felis. Etiam Id est - problema solvenda. Skyler est simplex partitio - introducam pecuniam, pecuniam launder. Id quod vobis deerat. Qui nunc loqueris? Ecce qui cogitatis? Vos scitis quanta ego faciam annum Id est, ut ego dixi vobis non credunt. Scis quid si ne subito placuit ire in opus?"
            },
            {
          "_id": 2,
          "author": 2,
          "postdate": 1453690800000,
          "contents": "Sum expectantes. Ego hodie expectantes. Expectantes, et misit unum de pueris Gus interficere. Et suus vos. Nescio quis, qui est bonus usus liberi ad Isai? Qui nosti ... Quis dimisit filios ad necem ... hmm? Gus! Est, ante me factus singulis decem gradibus. Et nunc ad aliud opus mihi tandem tollendum est puer ille consensus et nunc fugit. Ipse suus obtinuit eam. Non solum autem illa, sed te tractantur in se trahens felis."
            }
          ]
        },
        {
          "_id": 2,
          "title": "Let's Discuss",
          "postCount": [0],
          "posts": []
        }
      ]
      },
      {
      "_id": 2,
      "title": "Help and Suggestions",
      "threadCount": [0],
      "postCount": [0],
      "threads": []
      },
      {
      "_id": 3,
      "title": "Off-Topic",
      "threadCount": [0],
      "postCount": [0],
      "threads": []
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
  "newRelease": {
    "1": {
      "._id": 1,
      "contents": [
        {
          "imageURL": "img/fallout4.jpg",
          "gameTitle": "Fallout 4",
          "playlists": [103,104,105,106]
        },
        {
          "imageURL": "img/elite-dangerous.jpg",
          "gameTitle": "Elite Dangerous",
          "playlists": [107,108,109,110]
        }
      ]
    }
  },
  "mostPopular": {
    "1": {
      "._id": 1,
      "contents": [
        {
          "imageURL": "img/fallout4.jpg",
          "gameTitle": "Fallout 4",
          "playlists": [103,104,105,106]
        },
        {
          "imageURL": "img/elite-dangerous.jpg",
          "gameTitle": "Elite Dangerous",
          "playlists": [107,108,109,110]
        }
      ]
    }
  },
  "highestRated": {
    "1": {
      "._id": 1,
      // first newRelease Section
      "contents": [
        {
          "imageURL": "img/fallout4.jpg",
          "gameTitle": "Fallout 4",
          "playlists": [103,104,105,106]
        },
        {
          "imageURL": "img/elite-dangerous.jpg",
          "gameTitle": "Elite Dangerous",
          "playlists": [107,108,109,110]
        }
      ]
    }
  },
  "rising": {
    "1": {
      "._id": 1,
      // first newRelease Section
      "contents": [
        {
          "imageURL": "img/fallout4.jpg",
          "gameTitle": "Fallout 4",
          "playlists": [103,104,105,106]
        },
        {
          "imageURL": "img/elite-dangerous.jpg",
          "gameTitle": "Elite Dangerous",
          "playlists": [107,108,109,110]
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
