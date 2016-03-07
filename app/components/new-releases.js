import React from 'react';
import { getNewRelease } from '../server';
import PlaylistTable from './playlistTable';

export default class NewReleases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      contents: [{
        "gameTitle": "Empty",
        "newPlaylists": [
          {
            "game": "Empty",
            "imageURL": "",
            "title": "Empty",
            "author": 0,
            "votes": [],
            "genre": "Empty",
            "description": "Empty",
            "url": "Empty",
            "songs": []
          }
        ]
      },{
        "gameTitle": "Empty",
        "newPlaylists": [
          {
            "game": "Empty",
            "imageURL": "",
            "title": "Empty",
            "author": 0,
            "votes": [],
            "genre": "Empty",
            "description": "Empty",
            "url": "Empty",
            "songs": []
          }
        ]
      }
      ]
    };
  }

  refresh() {
    getNewRelease((newReleases) => {
      this.setState({loaded: true, contents: newReleases.contents})
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 playlist table-responsive">
            <div className="row">
              <div className="col-md-8">
                <h3 className="playlist-title"> New Playlists for <strong>
                  Elite Dangerous
                </strong></h3>
              </div>
              <div className="col-md-4">
                <img
                  src="img/elite-dangerous.jpg"
                  className="img-responsive"
                  alt="Elite Dangerous" />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Votes</th>
                  <th>Title</th>
                  <th>Creator</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              {/* SAMPLE PLAYLIST DATA */}
              <tbody>
                {this.state.contents[1].newPlaylists.map((d, i)=> {
                  return(
                    <PlaylistTable key={i}
                      votes={d.votes.length}
                      title={d.title}
                      creator={d.author}
                      description={d.description} />
                  );
                })}

                {/*


                <tr>
                  <td>
                    <strong>0</strong>
                  </td>
                  <td>
                    Rockin space shooty rock
                  </td>
                  <td>SuperDude12</td>
                  <td>
                    Hard Rock tracks to shoot spaceships to
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-default playlist-button">
                      <span className="glyphicon glyphicon-play-circle" />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>0</strong>
                  </td>
                  <td>
                    Chill space mining trance
                  </td>
                  <td>ChillDude53</td>
                  <td>
                    Just Chill
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-default playlist-button">
                      <span className="glyphicon glyphicon-play-circle" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>0</strong>
                  </td>
                  <td>
                    Space Piracy
                  </td>
                  <td>ShiverMeTimbersM8E</td>
                  <td>
                    The best of modern Pirate Metal and Pirate Rap for all your space pirate needs.
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-default playlist-button">
                      <span className="glyphicon glyphicon-play-circle" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>0</strong>
                  </td>
                  <td>
                    We can't stop here. This is space country.
                  </td>
                  <td>Bocephus</td>
                  <td>
                    It's classic country goodness. IN SPACE.
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-default playlist-button">
                      <span className="glyphicon glyphicon-play-circle" />
                    </button>
                  </td>
                </tr>
                */}

              </tbody>
            </table>
          </div>
        </div>



        <div className="row">
          <div className="col-md-8 col-md-offset-2 playlist table-responsive">
            <div className="row">
              <div className="col-md-8">
                <h3 className="playlist-title"> New Playlists for <strong>
                  Fallout 4
                </strong></h3>
              </div>
              <div className="col-md-4">
                <img
                  src="img/fallout4.jpg"
                  className="img-responsive"
                  alt="Elite Dangerous" />
              </div>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Votes</th>
                  <th>Title</th>
                  <th>Creator</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              {/* SAMPLE PLAYLIST DATA */}
              <tbody>
                {/*
                {(() => {
                        switch (this.state.loaded) {
                          case true:
                            this.state.contents[0].newPlaylists.map((d, i)=> {
                              return(
                                <PlaylistTable key={i}
                                  votes={d.votes.length}
                                  title={d.titles}
                                  creator={d.author}
                                  description={d.description} />
                              );
                            })
                            break;

                          case false:
                            return
                        }
                })()}
                */}

                {this.state.contents[0].newPlaylists.map((d, i)=> {
                  return(
                    <PlaylistTable key={i}
                      votes={d.votes.length}
                      title={d.title}
                      creator={d.author}
                      description={d.description} />
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }
}
