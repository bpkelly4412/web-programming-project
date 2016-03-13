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
import Forum from './components/forum';
import ForumTopic from './components/forum-topic';
import ForumThread from './components/forum-thread';
import ForumNewThread from './components/forum-newthread';
import ForumNewPost from './components/forum-newpost';
import PrivateChat from './components/private-chat';
import AboutUs from './components/about-us';
import SongList from './components/song-list';
import SearchResult from './components/search-result';
import ContactUs from './components/contact-us';
import Settings from './components/settings';
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

class SettingsPage extends React.Component {
    render() {
	return (
	    <Settings userID={1} />
	);
    }
}




/**
 * The Saved Playlist Page PLACEHOLDER page.
 */
class SavedPlayListPage extends React.Component {
  render() {
      return (
        <PlayListFeed userID={1} />
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
 * The Forums Page PLACEHOLDER page.
 */
class ForumPage extends React.Component {
  render() {
      return (
        <Forum userID={this.props.params.id}/>
      );
  }
}

class ForumTopicPage extends React.Component {
  render() {
      return (
        <ForumTopic tid={this.props.params.tid} userID={this.props.params.id}/>
      );
  }
}

class ForumThreadPage extends React.Component {
  render() {
      return (
        <ForumThread thid={this.props.params.thid} tid={this.props.params.tid} userID={this.props.params.id}/>
      );
  }
}

class ForumNewThreadPage extends React.Component {
  render() {
      return (
        <ForumNewThread tid={this.props.params.tid} userID={this.props.params.id}/>
      );
  }
}

class ForumNewPostPage extends React.Component {
  render() {
      return (
        <ForumNewPost thid={this.props.params.thid} tid={this.props.params.tid} userID={this.props.params.id}/>
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
 * The Private Chat Page PLACEHOLDER page.
 */
class PrivateChatPage extends React.Component {
  render() {
      return (
        <PrivateChat userID={1}/>
      );
  }
}

/**
 * The About Page PLACEHOLDER page.
 */
class AboutUsPage extends React.Component {
  render() {
      return (
        <AboutUs />
      );
  }
}

/**
 * The Song List Page PLACEHOLDER page.
 */
class SongListPage extends React.Component {
  render() {
      return (
        <SongList pid={this.props.params.pid} userID={this.props.params.id} />
      );
  }
}


class SearchResultPage extends React.Component {
  render() {
      return (
        <SearchResult userID={1} />
      );
  }
}

class ContactUsPage extends React.Component {
  render() {
      return (
        <ContactUs />
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
        <Navbar userID={1} />
        <div className = "row">
          <div className="col-md-2">
            <Sidebar userID={1} />
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
      <Route path="home/:id" component={StartPage} />
      <Route path="saved-playlist/:id" component={SavedPlayListPage} />
      <Route path="new-releases/:id" component={NewReleasesPage} />
      <Route path="most-popular/:id" component={MostPopularPage} />
      <Route path="highest-rated/:id" component={HighestRatedPage} />
      <Route path="rising-playlists/:id" component={RisingPlaylistsPage} />
      <Route path="profile/:id" component={ProfilePage} />
      <Route path="settings/:id" component={SettingsPage} />
      <Route path="forum/:id" component={ForumPage} />
      <Route path="forum-topic/:tid/:id" component={ForumTopicPage} />
      <Route path="forum-thread/:thid/:tid/:id" component={ForumThreadPage} />
      <Route path="forum-newthread/:tid/:id" component={ForumNewThreadPage} />
      <Route path="forum-newpost/:thid/:tid/:id" component={ForumNewPostPage} />
      <Route path="private-chat/:id" component={PrivateChatPage} />
      <Route path="about-us/:id" component={AboutUsPage} />
      <Route path="song-list/:pid/:id" component={SongListPage} />
      <Route path="search" component={SearchResultPage} />
      <Route path="contact-us/:id" component={ContactUsPage} />
    </Route>
  </Router>
),document.getElementById('page-content'));
