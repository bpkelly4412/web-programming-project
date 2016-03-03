import React from 'react';


export default class Profile extends React.Component {
  render() {
    return (
      <div className="col-md-10 col-md-offset-1 transparent-background">
        <div className="row profile-row">
          <div className="profile-header-container">
            <div className="profile-header-img">
              <img
                className="img-circle"
                src="img/profile_pic_default.png" />
              {/* badge */}
              <div className="rank-label-container">
                <span className="label label-default rank-label username-under-picture">Username</span>
              </div>
            </div>
          </div>
          <div className="btn-group pull-left" role="group">
            <button
              type="button"
              className="btn btn-default profile-button">
              FOLLOW
            </button>
          </div>
          <div
            className="btn-group pull-right"
            role="group">
            <button
              type="button"
              className="btn btn-default profile-button">
              <span className="glyphicon glyphicon-pencil" />
            </button>
          </div>
          {/* end profile header container*/}
        </div>
        {/* end of profile pic row*/}
        <div className="row profile-row">
          <div className="playlist col-md-12 table-responsive profile-playlist">
            <div className="row">
              <div className="col-md-8">
                <h3 className="playlist-title">
                  <strong>Current Game: </strong>
                  Elite Dangerous
                </h3>
              </div>
              <div className="col-md-4">
                <img
                  src="img/elite-dangerous.jpg"
                  className="img-responsive"
                  alt="Elite Dangerous" />
              </div>
            </div>
            <div
              className="btn-toolbar playlist-toolbar"
              role="toolbar">
              <div
                className="input-group"
                role="group"
                aria-label="Playback Buttons">
                <button
                  type="button"
                  className="btn btn-default playlist-button">
                  <span className="glyphicon glyphicon-stop" />
                </button>
                <button
                  type="button"
                  className="btn btn-default playlist-button">
                  <span className="glyphicon glyphicon-backward" />
                </button>
                <button
                  type="button"
                  className="btn btn-default playlist-button">
                  <span className="glyphicon glyphicon-play" />
                </button>
                <button
                  type="button"
                  className="btn btn-default playlist-button">
                  <span className="glyphicon glyphicon-forward" />
                </button>
              </div>
              <div
                className="input-group pull-right"
                role="group"
                aria-label="Playlist Options">
                <button
                  type="button"
                  className="btn btn-default playlist-button"
                  title="Add Track">
                  <span className="glyphicon glyphicon-plus-sign" />
                </button>
                <button
                  type="button"
                  className="btn btn-default playlist-button"
                  title="Share Playlist">
                  <span className="glyphicon glyphicon-share" />
                </button>
                <button
                  type="button"
                  className="btn btn-default playlist-button"
                  title="Options">
                  <span className="glyphicon glyphicon-cog" />
                </button>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
              </thead>
            </table>
          </div>
        </div>
        {/*end of 2nd row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Name:
          </div>
          <div className="col-md-4">
            FirstName LastName
          </div>
        </div>
        {/*end of 3rd row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            About:
          </div>
          <div className="col-md-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas nisi sed libero pretium efficitur. Phasellus eu laoreet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut lorem in felis suscipit ultricies nec quis mauris. Curabitur vitae nibh vitae nibh lobortis fringilla. Nullam massa libero, rutrum in tortor pretium, tempus iaculis ipsum. Vivamus ut velit risus. Aliquam non ligula ante. Maecenas eu tincidunt nulla. Suspendisse potenti.
          </div>
        </div>
        {/*end of 4th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Favorite Artists:
          </div>
          <div className="col-md-4">
            Artist1, Artist2, Artist3, Artist5, Artist6, Artist Seven, Artist Eight
          </div>
        </div>
        {/*end of 5th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Favorite Games:
          </div>
          <div className="col-md-4">
            Game1, Game2, Game3, Game4, Game Five, Game Six, Game Seven
          </div>
        </div>
        {/*end of 6th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Following:
          </div>
          <div className="col-md-4">
            Username1, Username2, Username3, Username_Four, Username_Five
          </div>
        </div>
        {/*end of 7th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Followers:
          </div>
          <div className="col-md-4">
            Username6, Username7, Username8, Username_Nine, Username_Ten
          </div>
        </div>
        {/*end of 8th row*/}
      </div>

    )
  }
}
