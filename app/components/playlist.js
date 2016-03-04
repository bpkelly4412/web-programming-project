import React from 'react';
import Song from './song';

export default class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {

    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2 playlist table-responsive">
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
              <button type="button" className="btn btn-default playlist-button" title="Add Track">
                <span className="glyphicon glyphicon-plus-sign"></span>
              </button>
              <button type="button" className="btn btn-default playlist-button" title="Share Playlist">
                <span className="glyphicon glyphicon-share"></span>
              </button>
              <button type="button" className="btn btn-default playlist-button" title="Options">
                <span className="glyphicon glyphicon-cog"></span>
              </button>
            </div>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <td className="col-md-1">Track</td>
                <td className="col-md-4">Song Title</td>
                <td className="col-md-3">Artist</td>
                <td className="col-md-3">Album</td>
                <td className="col-md-1"></td>
              </tr>
            </tbody>
          </table>
          {this.state.contents.map((songItem, i) => {
            return (
              <Song key={i} trackNumber={i + 1} title={songItem.title} artist={songItem.artist} album={songItem.album} />
            );
          })}
        </div>
      </div>
    )
  }
}
