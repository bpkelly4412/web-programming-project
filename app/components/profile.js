import React from 'react';
import Playlist from './playlist';
import { getUserData, getPlaylistCB} from '../server';


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentPlaylist: {
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
    }, editing: false};
  }


  refresh() {
    getUserData(this.props.userID, (userData) => {
      //this.setState(userData);
      getPlaylistCB(userData.currentPlaylistID, (playlist) => {
        userData.currentPlaylist = playlist;
        this.setState(userData)
      });
    });
      //this.setState({"currentPlaylist" :  getPlaylist(this.state.currentPlaylistID) });
    //getPlaylist(this.state.currentPlaylistID)};

  }

  render() {
    // Render the component differently based on state.
    if (this.state.editing) {
      return this.renderEdit();
    } else {
      return this.renderSaved();
    }
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  finishEdit(){
    this.setState({
      editing: false
    });
  }

  componentDidMount() {
    this.refresh();
  }


  renderSaved() {
    //console.log(this.state.currentPlaylist)
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
                <span className="label label-default rank-label username-under-picture">{this.state.nickName}</span>
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
              className="btn btn-default profile-button"
              onClick={this.edit.bind(this)}>
              <span className="glyphicon glyphicon-pencil"  />
            </button>
          </div>
          {/* end profile header container*/}
        </div>
        {/* end of profile pic row*/}

        <div className="row">
          <Playlist key={this.state.currentPlaylist._id}
            userID={this.props.userID}
            data={this.state.currentPlaylist}
            plFeedID={""}
            callbackPlaylistFeed = {""} />
      </div>

{/*
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
        </div>*/}
        {/*end of 2nd row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Name:
          </div>
          <div className="col-md-4">
            {this.state.userName}
          </div>
        </div>
        {/*end of 3rd row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            About:
          </div>
          <div className="col-md-4">
            {this.state.about}
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
  renderEdit(){
    return(
    <div className="col-md-10 col-md-offset-1 transparent-background">
      <div className="row profile-row">
        <div className="profile-header-container">
          <div className="profile-header-img">
            <img
              className="img-circle"
              src="img/profile_pic_default.png" />
            {/* badge */}
            <div className="rank-label-container">
              <span className="label label-default rank-label username-under-picture">{this.state.nickName}</span>
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
            className="btn btn-default profile-button"
            onClick={this.finishEdit.bind(this)}>
            SAVE
          </button>
        </div>
        {/* end profile header container*/}
      </div>
      {/* end of profile pic row*/}
{/*
      <div className="row">
        <Playlist key={this.state.currentPlaylist._id}
          userID={this.props.userID}
          data={this.state.currentPlaylist}
          plFeedID={""}
          callbackPlaylistFeed = {""} />
    </div>
*/}

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
          <input type="text"
             ref={(e) => e ? e.selectionStart = this.state.userName.length : null}
             autoFocus={true}
             defaultValue={this.state.userName}/>
        </div>
      </div>
      {/*end of 3rd row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          About:
        </div>
        <div className="col-md-4">
          <input type="text"
             ref={(e) => e ? e.selectionStart = this.state.about.length : null}
             autoFocus={true}
             defaultValue={this.state.about}/>
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
