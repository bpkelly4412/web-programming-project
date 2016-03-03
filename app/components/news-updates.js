import React from 'react';

export default class NewsUpdates extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body panel-title-style img-rounded">
                <h2>News and Updates</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body panel-body-style img-rounded">
                <a href="#"><h3>New Releases</h3></a>
                <div className="news-text">
                  <p>Playlists have been added for the new releases Blade and Soul, Rise of the Tomb Raider, and more!</p>
                </div>
                <div className="date-stamp">
                  2.6.2016
                </div>
                <div className="read-more">
                  <a href="#"> Read more... </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body panel-body-style img-rounded">
                <a href="#"><h3>Horror Playlist Update</h3></a>
                <div className="news-text">
                  <p>You asked. We delivered. We have updated our horror section to include playlists with creepy children!</p>
                </div>
                <div className="date-stamp">
                  1.26.2016
                </div>
                <div className="read-more">
                  <a href="#"> Read more... </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body panel-body-style img-rounded">
                <a href="#"><h3>New Releases</h3></a>
                <div className="news-text">
                  <p>Playlists have been added for the new releases Wick, Life is Strange, and more!</p>
                </div>
                <div className="date-stamp">
                  1.20.2016
                </div>
                <div className="read-more">
                  <a href="#"> Read more... </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body panel-body-style img-rounded">
                <a href="#"><h3>Genre Update: Rock</h3></a>
                <div className="news-text">
                  <p>We have updated our rock music section with several new playlists.</p>
                </div>
                <div className="date-stamp">
                  1.3.2016
                </div>
                <div className="read-more">
                  <a href="#"> Read more... </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body panel-body-style img-rounded">
                <a href="#"><h3>Site Maintenance</h3></a>
                <div className="news-text">
                  <p>The website will be down for maintenance on 12.23.2016 at 3:00 A.M. EST and should take approximately 2 hours.</p>
                </div>
                <div className="date-stamp">
                  12.22.2015
                </div>
                <div className="read-more">
                  <a href="#"> Read more... </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body panel-body-style img-rounded">
                <a href="#"><h3>New Releases</h3></a>
                <div className="news-text">
                  <p>Playlists have been added for the new releases Just Cause 3, Fallout 4, and more!</p>
                </div>
                <div className="date-stamp">
                  12.13.2015
                </div>
                <div className="read-more">
                  <a href="#"> Read more... </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
