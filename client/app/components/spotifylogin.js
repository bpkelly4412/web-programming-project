/**
 * Created by jesshendricks on 4/3/16.
 */
import React from 'react';
import {hideElement} from '../util';
import {spotifyLoginUser} from '../server';

/**
 * Displays a banner to prompt for the user to login to their Spotify account.
 */
export default class SpotifyLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      authURL: ""
    };

    // ASSUMPTION: There is only one ErrorBanner component ever created.
    // (Otherwise, each will overwrite one another's global function...)
    // By assigning to 'window', this is a global function. Global functions
    // are not typically a good idea, but they can be useful for adding basic
    // error handling to an application
    window.SpotifyAuth = (authURL) => {
      this.setState({
        active: true,
        authURL: authURL
      })
    };
  }

  handleLoginClick(clickEvent) {
    if (clickEvent.button === 0) {
        this.state = {
          active: false,
          authURL: ""
        };
    }
  }

  render() {
    // Don't display the error banner unless 'this.state.active' is true.
    return (
      <div className="col-md-10 col-md-offset-1">
        <div className={"panel panel-default playlist " + hideElement(!this.state.active)}>
          <div className="row">
            <iframe className="col-md-12" src = {this.state.authURL}></iframe>
          </div>
          <div className="row">
            <button type="submit"
                    className="btn btn-default playlist-button"
                    onClick={(e) => this.handleLoginClick(e)}>
              Login to Spotify
            </button>
          </div>
        </div>
      </div>
    );
  }
}
