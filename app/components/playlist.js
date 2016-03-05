import React from 'react';
import Song from './song';
import {Link} from 'react-router';

export default class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
    this.onChildChanged = this.onChildChanged.bind(this);
  }

  onChildChanged(newState) {
    this.setState(newState);
  }

  handleAddSongClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.context.router.push({pathname: "/song-list/" + this.state._id + "/" + this.props.userID});
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default playlist">
            <div className="panel-heading">
              <div className="row">
                <div className="col-md-8">
                  <h3 className="playlist-title"><strong>{this.state.title}</strong></h3>
                  <h3 className="playlist-title"><strong>Game: </strong>{this.state.game}</h3>
                  <h4><strong>Votes:</strong> {this.state.votes}</h4>
                </div>
                <div className="col-md-4">
                  <img src={this.state.imageURL} className="img-responsive" alt="Elite Dangerous" />
                </div>
              </div>

              <div className="btn-toolbar playlist-toolbar" role="toolbar">
                <div className="input-group" role="group" aria-label="Playback Buttons">
                  <button type="button" className="btn btn-default playlist-button">
                    <span className="glyphicon glyphicon-stop"></span>
                  </button>
                  <button type="button" className="btn btn-default playlist-button">
                    <span className="glyphicon glyphicon-backward"></span>
                  </button>
                  <button type="button" className="btn btn-default playlist-button">
                    <span className="glyphicon glyphicon-play"></span>
                  </button>
                  <button type="button" className="btn btn-default playlist-button">
                    <span className="glyphicon glyphicon-forward"></span>
                  </button>
                </div>
                <div className="input-group pull-right" role="group" aria-label="Playlist Options">
                  <button type="button" className="btn btn-default playlist-button" title="Add Track" onClick={(e) => this.handleAddSongClick(e)}>
                    <span className="fa fa-plus-circle"></span>
                  </button>
                  <Link to={"/song-list/" + this.state._id}><span className="fa fa-plus-circle"></span></Link>
                  <button type="button" className="btn btn-default playlist-button" title="Send to Spotify">
                    <span className="fa fa-spotify"></span>
                  </button>
                  <button type="button" className="btn btn-default playlist-button" title="Options">
                    <span className="fa fa-cogs"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="col-md-4">Song Title</td>
                    <td className="col-md-3">Artist</td>
                    <td className="col-md-4">Album</td>
                    <td className="col-md-1"></td>
                  </tr>
                </tbody>
              </table>
              {this.state.songs.map((songItem, i) => {
                return (
                  <Song key={i}
                    trackNumber={i + 1}
                    songIndex={i}
                    title={songItem.title}
                    artist={songItem.artist}
                    album={songItem.album}
                    playlistID={this.state._id}
                    songID={songItem._id}
                    callbackPlaylist = {this.onChildChanged}
                    hideRemoveSong="false" />
                );
              })}
            </div>
          </div>


        </div>
      </div>
    )
  }
}

Playlist.contextTypes = {
  router: React.PropTypes.object.isRequired
};
