import React from 'react';
import Playlist from './playlist';
import RecommendedSongs from './recommended-songs';
import { getPlaylistFeed, createNewPlaylist } from '../server';

export default class PlayListFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      newPlaylistName: "",
      newPlaylistGame: "",
      newPlaylistGenre: "",
      newPlaylistDescription: ""
    };
    this.onChildChanged = this.onChildChanged.bind(this);
  }

  onChildChanged(newState) {
    console.log(newState);
    this.setState(newState);
  }

  refresh() {
    getPlaylistFeed(this.props.userID, (feedData) => {
      this.setState(feedData);
    });
  }

  handleNewPlaylistNameChange(e) {
    this.setState({newPlaylistName: e.target.value});
  }

  handleNewPlaylistGameChange(e) {
    this.setState({newPlaylistGame: e.target.value});
  }

  handleNewPlaylistGenreChange(e) {
    this.setState({newPlaylistGenre: e.target.value});
  }

  handleNewPlaylistDescChange(e) {
    this.setState({newPlaylistDescription: e.target.value});
  }

  handleAddPlaylistClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0 && this.state.newPlaylistName !== "" && this.state.newPlaylistGame !== "") {
      createNewPlaylist(this.props.userID, this.state.newPlaylistName, this.state.newPlaylistGame, this.state.newPlaylistGenre, this.state.newPlaylistGenre, (data) => {
        this.refresh();
        // this.context.router.push({pathname: "/song-list/" + newPlaylistID + "/" + this.props.userID});
      });

    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="panel panel-default playlist ">
              <div className="panel-body">
                <div className="text-center">
                  <button type="button"
                    className="btn btn-default playlist-button"
                    data-toggle="collapse"
                    data-target="#addPlaylistForm">
                    <span className="fa fa-plus fa-2x"></span>
                    <h3>Add New Playlist</h3>
                  </button>
                </div>
                <div id="addPlaylistForm" className="collapse">
                <form>
                  <div className="form-group col-md-4">
                    <label htmlFor="playlistName">Name</label>
                    <input type="text"
                      id="playlistName"
                      className="form-control"
                      placeholder="Name"
                      value={this.state.value}
                      onChange={(e) => this.handleNewPlaylistNameChange(e)} />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="playlistGame">Game</label>
                    <input type="text"
                      id="playlistGame"
                      className="form-control"
                      placeholder="Game"
                      value={this.state.value}
                      onChange={(e) => this.handleNewPlaylistGameChange(e)} />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="playlistGenre">Genre</label>
                    <input type="text"
                      id="playlistGenre"
                      className="form-control"
                      placeholder="Genre"
                      value={this.state.value}
                      onChange={(e) => this.handleNewPlaylistGenreChange(e)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="playlistDescription">Description</label>
                    <input type="text"
                      id="playlistDescription"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.value}
                      onChange={(e) => this.handleNewPlaylistDescChange(e)} />
                  </div>
                  <button type="submit"
                    className="btn btn-default playlist-button"
                    onClick={(e) => this.handleAddPlaylistClick(e)}>
                    Submit
                  </button>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.contents.map((playlist) => {
            return (
              <Playlist key={playlist._id}
                userID={this.props.userID}
                data={playlist}
                plFeedID={this.state._id}
                callbackPlaylistFeed = {this.onChildChanged} />
            );
          })}
          <RecommendedSongs />

        </div>
      </div>
    )
  }
}

PlayListFeed.contextTypes = {
  router: React.PropTypes.object.isRequired
};
