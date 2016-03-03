import React from 'react';
import ReactDOM from 'react-dom';
import PlayListFeed from './components/playlistfeed';
import Sidebar from './components/navbar';
import Navbar from './components/sidebar';
import GameCarousel from './components/game-carousel';
import NewsUpdates from './components/news-updates';
import Profile from './components/profile';
import NewReleases from './components/new-releases';
import MostPopular from './components/most-popular';
import HighestRated from './components/highest-rated';
import RisingPlaylists from './components/rising';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'

/**
* Start Page PLACEHOLDER
*/
class StartPage extends React.Component {
  render() {
    return (
      <div>
        <GameCarousel />
        <NewsUpdates />
      </div>
    );
  }
}

/**
 * A Profile Page PLACEHOLDER
 */
class ProfilePage extends React.Component {
  render() {
    return (
      <Profile />
    );
  }
}

/**
 * The Saved Playlist Page PLACEHOLDER page.
 */
class SavedPlayListPage extends React.Component {
  render() {
      return (
        <PlayListFeed />
      );
  }
}

/**
 * The New Releases Page PLACEHOLDER page.
 */
class NewReleasesPage extends React.Component {
  render() {
      return (
        <NewReleases />
      );
  }
}

/**
 * The Most Popular Page PLACEHOLDER page.
 */
class MostPopularPage extends React.Component {
  render() {
      return (
        <MostPopular />
      );
  }
}

/**
 * The Highest Rated Page PLACEHOLDER page.
 */
class HighestRatedPage extends React.Component {
  render() {
      return (
        <HighestRated />
      );
  }
}

/**
 * The Highest Rated Page PLACEHOLDER page.
 */
class RisingPlaylistsPage extends React.Component {
  render() {
      return (
        <RisingPlaylists />
      );
  }
}


/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className = "row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render((


    // <PlayListFeed />
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={StartPage} />
      <Route path="saved-playlist/:id" component={SavedPlayListPage} />
      <Route path="new-releases/:id" component={NewReleasesPage} />
      <Route path="most-popular/:id" component={MostPopularPage} />
      <Route path="highest-rated/:id" component={HighestRatedPage} />
      <Route path="rising-playlists/:id" component={RisingPlaylistsPage} />
      <Route path="profile/:id" component={ProfilePage} />
    </Route>
  </Router>
),document.getElementById('page-content'));
