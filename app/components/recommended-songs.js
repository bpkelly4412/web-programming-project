import React from 'react';

export default class RecommendedSongs extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2 playlist table-responsive">
          <h2> Recommended songs </h2>
          <h3 className="playlist-title">Elite Dangerous</h3>
          <div className="row recommendation container">
            <div className="row">
              <div className="col-md-4 recommendation-box">
                <div className="row">
                  <div className="col-md-10">
                    Pelican - The Creeper
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-default playlist-button playlist-button-small">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 recommend-text">
                Recommended because you liked "Saxon - I've Got to Rock"
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 recommendation-box">
                <div className="row">
                  <div className="col-md-10">
                    Amon Amarth - Victory or Death
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-default playlist-button playlist-button-small">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 recommend-text">
                Recommended because you liked "Bolt Thrower - Anti-Tank"
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 recommendation-box">
                <div className="row">
                  <div className="col-md-10">
                    Jon Hallur - Below The Asteroids
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-default playlist-button playlist-button-small">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 recommend-text">
                Recommended because it is popular on the similar game "EVE Online"
              </div>
            </div>
          </div>
          <h3 className="playlist-title">Fallout 4</h3>
          <div className="row recommendation container">
            <div className="row">
              <div className="col-md-4 recommendation-box">
                <div className="row">
                  <div className="col-md-10">
                    Tenacious D - Deth Starr
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-default playlist-button playlist-button-small">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 recommend-text">
                Recommended because you liked "Tim and Eric - Beach Blast"
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 recommendation-box">
                <div className="row">
                  <div className="col-md-10">
                    Lil Dicky - Save that money
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-default playlist-button playlist-button-small">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 recommend-text">
                Recommended because you liked "2pac - Changes"
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 recommendation-box">
                <div className="row">
                  <div className="col-md-10">
                    Dropkick Murphys - The State of Massachusetts
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-default playlist-button playlist-button-small">
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8 recommend-text">
                Recommended because it is popular on this game.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
