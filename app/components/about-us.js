import React from 'react';


export default class AboutUs extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 about">
          <ol className="breadcrumb">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li className="active">About</li>
          </ol>
          <h2>About</h2>
          <div className="row">
            <div className="col-md-11 col-md-offset-1">
              <img src="img/forte.png" alt="BBQ Forte Logo" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>
                BBQ Forte is a web app that allows users to view music tracks and playlists that go well with all your favorite Steam games.
              </h4>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
