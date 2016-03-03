import React from 'react';

export default class GameCarousel extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div id="myCarousel" className="carousel slide center-block" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
              <li data-target="#myCarousel" data-slide-to="3"></li>
              <li data-target="#myCarousel" data-slide-to="4"></li>
            </ol>

            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <a href="#"><img src="img/steam_banner.png" alt="Steam Banner" /></a>
                <a href="#">
                  <div className="carousel-caption">
                    <h4>Sync your Steam library to BBQ Forte!</h4>
                  </div>
                </a>
              </div>

              <div className="item">
                <a href="#"><img src="img/blade_and_soul_banner.png" alt="Blade and Soul Banner" /></a>
                <a href="#">
                  <div className="carousel-caption">
                    <h4>Check out playlists for the new release Blade and Soul</h4>
                  </div>
                </a>
              </div>

              <div className="item">
                <a href="#"><img src="img/ori_banner.png" alt="Ori Banner" /></a>
                <a href="#">
                  <div className="carousel-caption">
                    <h4>Browse popular single-player game playlists</h4>
                  </div>
                </a>
              </div>

              <div className="item">
                <a href="#"><img src="img/civ_v_banner.png" alt="Civ V Banner" /></a>
                <a href="#">
                  <div className="carousel-caption">
                    <h4>Listen to the top-rated playlists for Civ V</h4>
                  </div>
                </a>
              </div>

              <div className="item">
                <a href="#"><img src="img/i_am_bread_banner.png" alt="I am Bread Banner" /></a>
                <a href="#">
                  <div className="carousel-caption">
                    <h4>Even bread needs some great music! Check out these playlists</h4>
                  </div>
                </a>
              </div>
            </div>

            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
