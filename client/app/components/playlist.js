import React from 'react';
import Song from './song';
import SongList from './song-list';
import { unvotePlaylist, votePlaylist, removePlaylist } from '../server';

export default class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = { songs: this.props.data.songs, votes: this.props.data.votes }
    this.onChildChanged = this.onChildChanged.bind(this);
  }

  onChildChanged(newState) {
    this.setState(newState);
  }

  handleAddSongClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      this.context.router.push({pathname: "/song-list/" + this.props.data._id + "/" + this.props.userID});
    }
  }

  handleRemovePlaylistClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = () => {
        this.props.callbackPlaylistFeed();
      };
      removePlaylist(this.props.data._id, callbackFunction);
    }
  }

  handleVoteClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedVoteCounter) => {
        this.setState({votes: updatedVoteCounter});
      };

      if (this.didUserVote()) {
        unvotePlaylist(this.props.data._id, this.props.userID, callbackFunction);
      } else {
        votePlaylist(this.props.data._id, this.props.userID, callbackFunction);
      }
    }
  }

  didUserVote() {
    var votes = this.state.votes;
    var voted = false;
    for (var i=0; i < votes.length; i++) {
      if (votes[i] === this.props.userID) {
        voted = true;
        break;
      }
    }
    return voted;
  }

  render() {
    var voteButtonIcon = "fa fa-level-up";
    var voteButtonDesc = "Vote for playlist.";
    if (this.didUserVote()) {
      voteButtonIcon = "fa fa-check";
      voteButtonDesc = "Unvote.";
    }
    var playlistDivID = "#" + this.props.data._id;
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default playlist">
            <div className="panel-heading">
              <div className="row">
                <div className="col-md-8">
                  <h3 className="playlist-title"><strong>{this.props.data.title}</strong></h3>
                  <h4 className="playlist-title"><strong>Game: </strong>{this.props.data.game}</h4>
                    <button type="button"
                      className="btn btn-default playlist-button"
                      title={voteButtonDesc}
                      onClick={(e) => this.handleVoteClick(e)}>
                      <span className={voteButtonIcon}></span>
                    </button><strong>Votes:</strong> {this.state.votes.length}
                  </div>
                  <div className="col-md-4">
                    <img src={this.props.data.imageURL} className="img-responsive" alt="PIC" />
                  </div>
                </div>

                <div className="btn-toolbar playlist-toolbar" role="toolbar">
                  <div className="input-group" role="group" aria-label="Playback Buttons">
                    <button type="button" className="btn btn-default playlist-button disabled">
                      <span className="fa fa-stop"></span>
                    </button>
                    <button type="button" className="btn btn-default playlist-button disabled">
                      <span className="fa fa-backward"></span>
                    </button>
                    <button type="button" className="btn btn-default playlist-button disabled">
                      <span className="fa fa-play"></span>
                    </button>
                    <button type="button" className="btn btn-default playlist-button disabled">
                      <span className="fa fa-forward"></span>
                    </button>
                  </div>
                  <div className="input-group pull-right" role="group" aria-label="Playlist Options">
                    <button type="button"
                      className="btn btn-default playlist-button"
                      title="View Tracks"
                      data-toggle="collapse"
                      data-target={playlistDivID}>
                      Songs <span className="fa fa-caret-square-o-down"></span>
                    </button>
                    <button type="button" className="btn btn-default playlist-button disabled" title="Sync with Spotify">
                      Sync With Spotify <span className="fa fa-spotify"></span>
                    </button>
                    <button type="button"
                      className="btn btn-default playlist-button"
                      title="Delete Playlist"
                      onClick={(e) => this.handleRemovePlaylistClick(e)}>
                      Delete <span className="fa fa-times-circle"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div id={this.props.data._id} className="panel-collapse collapse">
                <SongList pid={this.props.data._id}
                  userID={this.props.userID}
                  callbackPlaylist = {this.onChildChanged} />
                <table className="table">
                  <tbody>
                    <tr className="playlist-toolbar">
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
                      spotify_id = {songItem.spotify_id}
                      title={songItem.title}
                      artist={songItem.artist}
                      album={songItem.album}
                      uri={songItem.uri}
                      duration={songItem.duration}
                      playlistID={this.state._id}
                      callbackPlaylist = {this.onChildChanged}
                      hideRemoveSong="false" />
                  );
                })}
              </div>
            <div className="panel-footer text-center">
              {this.state.songs.length} songs.
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
