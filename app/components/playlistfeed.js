import React from 'react';
import Playlist from './playlist';

export default class PlayListFeed extends React.Component {
  render() {
    return (
      <div>
        <Playlist currentGame="Elite Dangerous" imageURL="img/elite-dangerous.jpg"/>
        <Playlist currentGame="Fallout 4" imageURL="img/fallout4.jpg" />
      </div>
    )
  }
}
