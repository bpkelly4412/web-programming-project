import React from 'react';
import Playlist from './playlist';
import Recommend from './recommend';
import PlaylistShort from './playlist-short';
import { checkSpotifyLoggedIn, searchForPlaylists, addPlaylist, getPlaylistFeed, createNewPlaylist, getUserData } from '../server';

export default class PlayListFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      newPlaylistName: "",
      newPlaylistGame: "",
      newPlaylistGenre: "",
      newPlaylistDescription: "",
      playlistSearchTerm: "",
      playlistSearchResults: []
    };
    this.onChildChanged = this.onChildChanged.bind(this);
  }

  onChildChanged() {
    this.refresh();
  }

  refresh() {
    getPlaylistFeed(this.props.userID, (feedData) => {
      this.setState(feedData);
    });
    getUserData(this.props.userID, (userData) => {
      this.setState({userData: userData});
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
      this.setState({value: ""});
      createNewPlaylist(this.props.userID,
        this.state.newPlaylistName,
        this.state.newPlaylistGame,
        this.state.newPlaylistGenre,
        this.state.newPlaylistDescription, () =>
        {
          this.refresh();
        });
    }
  }

  handlePlaylistSearchValueChange(e) {
    this.setState({playlistSearchTerm: e.target.value});
  }

  handlePlaylistSearchClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0 && this.state.playlistSearchTerm !== "") {
      searchForPlaylists(this.state.playlistSearchTerm, this.props.userID, (playlistResults) => {
        this.setState({playlistSearchResults: playlistResults});
      });
    }
  }

  handleImportPlaylistClick(clickEvent, playlist) {
    // this.setState({ playlistSearchResults: [], value: "", playlistSearchTerm: "", contents: updatedPlaylistFeed });
  }

  checkLogInSpotifyClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      checkSpotifyLoggedIn(this.props.userID, (isLoggedIn) => {
        console.log("Logged into Spotify: ", isLoggedIn);
      })
    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="panel panel-default playlist ">
                <div className="panel-body">
                  <div className="text-center">
                    <button type="button"
                            className="btn btn-default playlist-button"
                            data-toggle="collapse"
                            data-target="#addPlaylistForm"
                            onClick={(e) => this.checkLogInSpotifyClick(e)}>
                      <span className="fa fa-plus fa-2x"></span>
                      <h3>Create Playlist</h3>
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
            <div className="col-md-6">
              <div className="panel panel-default playlist ">
                <div className="panel-body">
                  <div className="text-center">
                    <button type="button"
                            className="btn btn-default playlist-button"
                            data-toggle="collapse"
                            data-target="#searchPlaylistForm"
                            onClick={(e) => this.checkLogInSpotifyClick(e)}>
                      <span className="fa fa-search fa-2x"></span>
                      <h3>Import Playlist</h3>
                    </button>
                  </div>
                  <div id="searchPlaylistForm" className="collapse">
                    <form>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text"
                                 id="playlistDescription"
                                 className="form-control"
                                 placeholder="Search for playlists..."
                                 value={this.state.value}
                                 onChange={(e) => this.handlePlaylistSearchValueChange(e)} />
                        <span className="input-group-addon">
                          <span className="fa fa-search"></span>
                        </span>
                        </div>
                      </div>
                      <button type="submit"
                              className="btn btn-default playlist-button"
                              onClick={(e) => this.handlePlaylistSearchClick(e)}>
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="row">
                    {(() => {
                      switch (this.state.playlistSearchTerm) {
                        case "":
                          return null;
                        default:
                          return <p className="search-result">Results for "{this.state.playlistSearchTerm}"</p>;
                      }
                    })()}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="panel panel-default playlist ">
            <div className="panel-body">
              <div className="col-md-10 col-md-offset-1 songlist-table">
                {this.state.playlistSearchResults.map((playlist, i) => {
                  return (
                    <div key={i} onClick={(e) => this.handleImportPlaylistClick(e, playlist)}>
                      <PlaylistShort title = {playlist.playlist.title}
                                     uri = {playlist.playlist.uri}
                                     url = {playlist.playlist.url}
                                     owner = {playlist.playlist.spotify_author}
                                     numTracks = {playlist.numTracks.total}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.contents.map((playlist, i) => {
            return (
              <div key={i}>
                <Playlist key={i}
                          userID={this.props.userID}
                          data={playlist}
                          plFeedID={this.state._id}
                          callbackPlaylistFeed = {this.onChildChanged} />
                {this.state.userData? (this.state.userData.recommend ? <Recommend userID = {this.props.userID}/> : null) : null}
              </div>
            );
          })}

        </div>
      </div>
    )
  }
}

PlayListFeed.contextTypes = {
  router: React.PropTypes.object.isRequired
};
