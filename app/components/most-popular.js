import React from 'react';


export default class MostPopular extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 playlist table-responsive">
            <div className="row">
              <div className="col-md-8">
                <h3 className="playlist-title"> Popular Playlists for <strong>
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
                <tr>
                  <td>
                    <strong>1312</strong>
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
                    <strong>1222</strong>
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
                    <strong>801</strong>
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
                    <strong>533</strong>
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
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 playlist table-responsive">
            <div className="row">
              <div className="col-md-8">
                <h3 className="playlist-title"> Popular Playlists for <strong>
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
                <tr>
                  <td>
                    <strong>1713</strong>
                  </td>
                  <td>
                    Boston Jams
                  </td>
                  <td>Bocephus</td>
                  <td>
                    Thematic music about Boston
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
                    <strong>1222</strong>
                  </td>
                  <td>
                    Swingin it
                  </td>
                  <td>SuperDude12</td>
                  <td>
                    Classic atmospheric 1950's music.
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
                    <strong>831</strong>
                  </td>

                  <td>
                    HEAVY METAL THUNDER
                  </td>
                  <td>TRVE_KVLT</td>
                  <td>
                    Heavy metal sounds for your heavy metal powersuit.
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
                    <strong>123</strong>
                  </td>
                  <td>
                    I don't know
                  </td>
                  <td>A_guy_42</td>
                  <td>
                    It has music, I think.
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-default playlist-button">
                      <span className="glyphicon glyphicon-play-circle" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }
}
