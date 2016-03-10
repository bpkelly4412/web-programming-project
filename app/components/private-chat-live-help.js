import React from 'react';
import PrivateChatLiveHelpUserList from './private-chat-live-help-userlist';
import {getLiveHelpList} from '../server';

export default class PrivateChatLiveHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contents: [] };
  }

  refresh() {
    getLiveHelpList(this.props.userID, (liveHelp) => {
      this.setState(liveHelp);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  handleSwitchChat(userID) {
    this.props.handleSwitchChat(userID);
  }

  render() {
    return (
      <div className="col-md-3">
        <div className="panel panel-default">
          <div className="panel-body panel-title-style chat-split">
            <h4>
              Live Help
            </h4>
          </div>

          <div className="panel-body panel-title-style user-list user-list-scroll">
            {this.state.contents.map((genreGroup, i) => {
              return (
                <PrivateChatLiveHelpUserList key={i}
                  genre={genreGroup.genre}
                  userList={genreGroup.userList}
                  handleSwitchChat={(otherUserID) => this.handleSwitchChat(otherUserID)} />
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}
