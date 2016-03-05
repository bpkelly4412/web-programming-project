import React from 'react';
import Playlist from './playlist';
import RecommendedSongs from './recommended-songs';
import {getPlaylistFeed} from '../server';

export default class PlayListFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contents: [] };
  }

  refresh() {
    getPlaylistFeed(this.props.userID, (feedData) => {
      this.setState(feedData);
    });
  }


  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div className="row playlist">

        </div>
        <div className="row">
          {this.state.contents.map((playlist) => {
            return (
              <Playlist key={playlist._id} userID={this.props.userID} data={playlist} />
            );
          })}
          <RecommendedSongs />

        </div>
      </div>
    )
  }
}
