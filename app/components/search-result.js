import React from 'react';


export default class SearchResult extends React.Component {

  render() {
    return (
      <div className="col-md-12">

        <h5>You are searching for "league, elite, hobbit, harry"</h5>
        <div classNameName="panel-group">
          <h1 className="section-title">Playlists</h1>

          <div className="panel panel-default">
            <div className="panel-heading playlist">
              <div className="row">
                  <div className="col-md-2">
                    <img src="img/league.jpg" className="img-responsive" />
                  </div>
                  <div className="col-md-5">
                    <h4>League of Legends Playlist</h4>
                    <h5>Genre: Rock, Nightcore</h5>
                    <h5>Number of songs: 4</h5>
                    <button type="button" className="btn btn-default playlist-button" href="#"><span className="glyphicon glyphicon-play"></span></button>
                    <button type="button" className="btn btn-default playlist-button button-addition" href="#"><span className="glyphicon glyphicon-heart-empty"></span></button>
                    <div className="pull-right">
                      <button type="button" className="btn btn-default playlist-button" data-toggle="collapse" href="#collapse1"><span className="glyphicon glyphicon-option-vertical"></span></button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h5>Last played on: 02/06/2016</h5>
                    <h5>Popularity: 2526</h5>
                    <h5>Duration: 1hr 39min </h5>
                    <h5>Created by: Username on 02/06/2015</h5>
                  </div>
              </div>
            </div>
            <div id="collapse1" className="panel-collapse collapse">
              <div className="panel-body playlist">
                <div className="table-responsive ">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Track</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>The Beginning</td>
                        <td>One Ok Rock</td>
                        <td>The Beginning</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Monster</td>
                        <td>Nightcore</td>
                        <td>Nightcore</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Anima Libera</td>
                        <td>Nightcore</td>
                        <td>Nightcore</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Moonlight Shadow</td>
                        <td>Nightcore</td>
                        <td>Nightcore</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading playlist">
              <div className="row">
                  <div className="col-md-2">
                    <img src="img/elite-dangerous.jpg" className="img-responsive" />
                  </div>
                  <div className="col-md-5">
                    <h4>Elite Dangerous Playlist</h4>
                    <h5>Type: Instrumental</h5>
                    <h5>Number of songs: 4</h5>
                    <button type="button" className="btn btn-default playlist-button" href="#"><span className="glyphicon glyphicon-play"></span></button>
                    <button type="button" className="btn btn-default playlist-button button-addition" href="#"><span className="glyphicon glyphicon-heart-empty"></span></button>
                    <div className="pull-right">
                      <button type="button" className="btn btn-default playlist-button" data-toggle="collapse" href="#collapse2"><span className="glyphicon glyphicon-option-vertical"></span></button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h5>Last played on: 01/06/2016</h5>
                    <h5>Popularity: 2016</h5>
                    <h5>Duration: 1hr 34min </h5>
                    <h5>Created by: Username on 02/06/2016</h5>
                  </div>
              </div>
            </div>
            <div id="collapse2" className="panel-collapse collapse">
              <div className="panel-body playlist">
                <div className="table-responsive ">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Track</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Flight</td>
                        <td>Hans Zimmer</td>
                        <td>Man of Steel (Original Motion Picture Soundtrack)</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Requiem (for String Orchestra)</td>
                        <td>Takemitsu</td>
                        <td>Takemitsu: Orchestral Works</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Summa</td>
                        <td>Arvo Pärt</td>
                        <td>The Very Best of Arvo Pärt</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Morag</td>
                        <td>Tyler Bates</td>
                        <td>Guardians of the Galaxy (Original Score)</td>
                        <td>
                          <button type="button" className="btn btn-default playlist-button playlist-button-small">
                            <span className="glyphicon glyphicon-plus-sign"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h1 className="section-title">Songs</h1>

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
        </div>
      </div>
    )
  }
}
