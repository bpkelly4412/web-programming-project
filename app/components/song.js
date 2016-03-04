import React from 'react';

export default class Song extends React.Component {
  render() {
    return (
      <table className="table table-hover">
        <tbody>
          <tr>
            <td className="col-md-1">{this.props.trackNumber}</td>
            <td className="col-md-4">{this.props.title}</td>
            <td className="col-md-3">{this.props.artist}</td>
            <td className="col-md-3">{this.props.album}</td>
            <td className="col-md-1">
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
