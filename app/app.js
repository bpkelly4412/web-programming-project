import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

/**
 * A Profile Page PLACEHOLDER
 */
class ProfilePage extends React.Component {
  render() {
    return (
      <p>This is the profile page.</p>
    );
  }
}

/**
 * The Saved Playlist Page PLACEHOLDER page.
 */
class SavedPlayListPage extends React.Component {
  render() {
      return (
        <p>This is the playlist page.</p>
      );
  }
}


/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 *
 * TODO: Add components for the sidebar AND the navbar.
 */
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={SavedPlayListPage} />
      <Route path="profile/:id" component={ProfilePage} />
    </Route>
  </Router>
),document.getElementById('content-column'));
