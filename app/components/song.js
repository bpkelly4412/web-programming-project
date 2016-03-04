import React from 'react';
import { removeSong } from '../server';

export default class Song extends React.Component {

  handleRemoveSongClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedSongs) => {
        this.props.callbackPlaylist(updatedSongs);
      };
      removeSong(this.props.playlistID, this.props.songID, callbackFunction);
    }
  }

  render() {
    return (
      <table className="table table-hover">
        <tbody>
          <tr>
            <td className="col-md-4">{this.props.trackNumber}... {this.props.title}</td>
            <td className="col-md-3">{this.props.artist}</td>
            <td className="col-md-4">{this.props.album}</td>
            <td className="col-md-1">
            <button type="button"
              className="btn btn-default playlist-button playlist-button-small"
              onClick={(e) => this.handleRemoveSongClick(e)}>
              <span className="glyphicon glyphicon-remove-sign"></span>
            </button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
