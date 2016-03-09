import React from 'react';


export default class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    // Populating this.state.contents with mock search data to display
    this.state = {
      playlists: [
      {
        "game": "League of Legends",
        "imageURL": "img/league.jpg",
        "title": "League of Legends Playlist",
        "author": 0,
        "votes": [],
        "genre": "Rock, Nightcore",
        "description": "",
        "url": "Empty",
        "songs": [{
          "imgURL": "img/playlist_disc.jpg",
          "title": "The Beginning",
          "artist": "One Ok Rock",
          "album": "The Beginning",
          "type": "Rock",
          "duration": 216,
          "url": "TBD"
        },{
          "imgURL": "img/playlist_disc.jpg",
          "title": "Monster",
          "artist": "Nightcore",
          "album": "Nightcore",
          "type": "Nightcore",
          "duration": 201,
          "url": "TBD"
        },{
          "imgURL": "img/playlist_disc.jpg",
          "title": "Anima Libera",
          "artist": "Nightcore",
          "album": "Nightcore",
          "type": "Nightcore",
          "duration": 265,
          "url": "TBD"
        },{
          "imgURL": "img/playlist_disc.jpg",
          "title": "Moonlight Shadow",
          "artist": "Nightcore",
          "album": "Nightcore",
          "type": "Nightcore",
          "duration": 224,
          "url": "TBD"
        }]
      },{
            "game": "Elite Dangerous",
            "imageURL": "img/elite-dangerous.jpg",
            "title": "Elite Dangerous Playlist",
            "author": 0,
            "votes": [],
            "genre": "Instrumental",
            "description": "",
            "url": "Empty",
            "songs": [{
              "imgURL": "img/playlist_disc.jpg",
              "title": "The Beginning",
              "artist": "One Ok Rock",
              "album": "The Beginning",
              "type": "Rock",
              "duration": 216,
              "url": "TBD"
            },{
              "imgURL": "img/playlist_disc.jpg",
              "title": "Monster",
              "artist": "Nightcore",
              "album": "Nightcore",
              "type": "Nightcore",
              "duration": 201,
              "url": "TBD"
            },{
              "imgURL": "img/playlist_disc.jpg",
              "title": "Anima Libera",
              "artist": "Nightcore",
              "album": "Nightcore",
              "type": "Nightcore",
              "duration": 265,
              "url": "TBD"
            },{
              "imgURL": "img/playlist_disc.jpg",
              "title": "Moonlight Shadow",
              "artist": "Nightcore",
              "album": "Nightcore",
              "type": "Nightcore",
              "duration": 224,
              "url": "TBD"
            }]

      }],
      songs:[{
        "imgURL": "img/hobbit.jpg",
        "title": "My Dear Frodo",
        "artist": "Howard Shore",
        "album": "The Hobbit Soundtrack",
        "type": "Intrumental",
        "duration": 454,
        "url": "TBD"
      },{
        "imgURL": "img/harry_potter.jpg",
        "title": "The Story Continues",
        "artist": "Patrick Doyle",
        "album": "Harry Potter Soundtrack",
        "type": "Intrumental",
        "duration": 312,
        "url": "TBD"
      }
    ]
    };
  }
  /*
  refresh() {
      this.setState()
  }

  componentDidMount() {
    this.refresh();
  }*/


  render() {
    return (
      <div className="col-md-12">

        <h5>You are searching for "league, elite, hobbit, harry"</h5>
        <div className="panel-group">
          <h1 className="section-title">Playlists</h1>

          {this.state.playlists.map((playlist, i) => {
            return(
              <div key={i} className="panel panel-default">
                <div className="panel-heading playlist">
                  <div className="row">
                      <div className="col-md-2">
                        <img src={playlist.imageURL} className="img-responsive" />
                      </div>
                      <div className="col-md-5">
                        <h4>{playlist.title}</h4>
                        <h5>Genre: {playlist.genre}</h5>
                        <h5>Number of songs: {playlist.songs.length}</h5>
                        <button type="button" className="btn btn-default playlist-button" href="#"><span className="glyphicon glyphicon-play"></span></button>
                        <button type="button" className="btn btn-default playlist-button button-addition" href="#"><span className="glyphicon glyphicon-heart-empty"></span></button>
                        <div className="pull-right">
                          <button type="button" className="btn btn-default playlist-button" data-toggle="collapse" href={"#collapse"+i}><span className="glyphicon glyphicon-option-vertical"></span></button>
                        </div>
                      </div>
                      <div className="col-md-5">
                        {/*Might consider adding more elements of playlists*/}
                      </div>
                  </div>
                </div>
                <div id={"collapse"+i} className="panel-collapse collapse">
                  <div className="panel-body playlist">
                    <div className="table-responsive ">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Track</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                        {playlist.songs.map((song, k) => {
                          return(
                            <tr key={k}>
                              <td>{k+1}</td>
                              <td>{song.title}</td>
                              <td>{song.artist}</td>
                              <td>{song.album}</td>
                              <td>{song.duration}</td>
                              <td>
                                <button type="button" className="btn btn-default playlist-button playlist-button-small">
                                  <span className="glyphicon glyphicon-plus-sign"></span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <hr />
          <h1 className="section-title">Songs</h1>
          {this.state.songs.map((song, i) => {
            return(
              <div key={i} className="panel panel-default">
                <div className="panel-heading playlist">
                  <div className="row">
                      <div className="col-md-2">
                        <img src={song.imgURL} className="img-responsive" />
                      </div>
                      <div className="col-md-5">
                        <h4>Title: {song.title}</h4>
                        <h5>Type: {song.type}</h5>

                        <button type="button" className="btn btn-default playlist-button" href="#"><span className="glyphicon glyphicon-play"></span></button>
                        <button type="button" className="btn btn-default playlist-button button-addition" href="#"><span className="glyphicon glyphicon-plus"></span></button>
                      </div>
                      <div className="col-md-5">
                        <h5>Artist: {song.artist}</h5>
                        <h5>Album: {song.album}</h5>
                        <h5>Duration: {song.duration} </h5>
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/*
          <div className="panel panel-default">
            <div className="panel-heading playlist">
              <div className="row">
                  <div className="col-md-2">
                    <img src="img/hobbit.jpg" className="img-responsive" />
                  </div>
                  <div className="col-md-5">
                    <h4>Name: My Dear Frodo</h4>
                    <h5>Type: Instrumental</h5>
                    <h5>Artist: Howard Shore</h5>
                    <button type="button" className="btn btn-default playlist-button" href="#"><span className="glyphicon glyphicon-play"></span></button>
                    <button type="button" className="btn btn-default playlist-button button-addition" href="#"><span className="glyphicon glyphicon-plus"></span></button>
                  </div>
                  <div className="col-md-5">
                    <h5>Album: The Hobbit Soundtrack</h5>
                    <h5>Popularity: 1587</h5>
                    <h5>Duration: 7min 34sec </h5>
                    <h5>Last played on: 01/06/2016</h5>
                  </div>
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading playlist">
              <div className="row">
                  <div className="col-md-2">
                    <img src="img/harry_potter.jpg" className="img-responsive img-resize" />
                  </div>
                  <div className="col-md-5">
                    <h4>Name:The Story Continues</h4>
                    <h5>Type: Instrumental</h5>
                    <h5>Artist: Patrick Doyle</h5>
                    <button type="button" className="btn btn-default playlist-button" href="#"><span className="glyphicon glyphicon-play"></span></button>
                    <button type="button" className="btn btn-default playlist-button button-addition" href="#"><span className="glyphicon glyphicon-plus"></span></button>
                  </div>
                  <div className="col-md-5">
                    <h5>Album: Harry Potter Soundtrack</h5>
                    <h5>Popularity: 5842</h5>
                    <h5>Duration: 5min 2sec </h5>
                    <h5>Last played on: 01/06/2016</h5>
                  </div>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    )
  }
}
