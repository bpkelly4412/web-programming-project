import React from 'react';

export default class Song extends React.Component {
  render() {
    return (
      <table className="table table-hover">
        <tbody>
          <tr>
            <td>{this.props.trackNumber}</td>
            <td>{this.props.songTitle}</td>
            <td>{this.props.artistName}</td>
            <td>{this.props.albumName}</td>
            <td>
            <button type="button" className="btn btn-default playlist-button playlist-button-small">
              <span className="glyphicon glyphicon-remove-sign"></span>
            </button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
