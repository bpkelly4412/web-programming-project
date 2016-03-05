import React from 'react';
import Song from './song';
import {getSongList} from '../server';

export default class SongList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { songs: [], value: "" };
  }

  handleSongSearch(searchText) {
    getSongList(searchText, (songList) => {
      this.setState({songs: songList, value: ""});
    })
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyUp(e) {
    if (e.key === "Enter") {
      var searchText = this.state.value;
      if (searchText !== "") {
        this.handleSongSearch(searchText);
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default songlist">
            <div className="panel-heading">
              <div className="row">
                <h3 className="playlist-title">Search for Songs</h3>
              </div>
              <div className="row playlist-toolbar">
                <form className="navbar-form" role="search">
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search for songs..."
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                        onKeyUp={(e) => this.handleKeyUp(e)} />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-search"></span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="panel-body">
              <div className="row">
                {this.state.songs.map((songItem, i) => {
                  return (
                    <Song key={i} trackNumber={i + 1} title={songItem.title} artist={songItem.artist} album={songItem.album} playlistID={this.state._id} songID={songItem._id} callbackPlaylist = {this.onChildChanged} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
