import React from 'react';
import Song from './song';

export default class Playlist extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2 playlist table-responsive">
              <div className="row">
                <div className="col-md-8">
                  <h3 className="playlist-title"><strong>Current Game: </strong>{this.props.currentGame}</h3>
                </div>
                <div className="col-md-4">
                  <img src={this.props.imageURL} className="img-responsive" alt="Elite Dangerous" />
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
          <Song trackNumber="1" songTitle="Flight" artistName="Hans Zimmer" albumName="Man of Steel (Original Motion Picture Soundtrack)"/>
          <Song trackNumber="2" songTitle="Requiem (for String Orchestra)" artistName="Takemitsu" albumName="Takemitsu: Orchestral Works" />
          <Song trackNumber="3" songTitle="Summa" artistName="Arvo Pärt" albumName="The Very Best of Arvo Pärt" />
          <Song trackNumber="4" songTitle="Morag" artistName="Tyler Bates" albumName="Guardians of the Galaxy (Original Score)" />
      </div>
    </div>
    )
  }
}
