import React from 'react';
import {getRecentConversations, removeRecentChat} from '../server';

export default class RecentConversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] };
  }

  refresh() {
    getRecentConversations(this.props.userID, this.props.otherUserID, (recentConversations) => {
      this.setState(recentConversations);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  handleSwitchChat(e, userID) {
    this.props.handleSwitchChat(e, userID);
  }

  handleRemoveRecentChat(e, userID) {
    e.preventDefault();

    if (e.button === 0) {
      var callbackFunction = (updatedUserList => {
        this.setState({userList: updatedUserList});
      })

      removeRecentChat(this.props.userID, userID, callbackFunction);
    }
  }

  render() {
    return (
      <div id="recent-convos" className="col-md-3">
        <div className="panel panel-default">
          <div className="panel-body panel-title-style chat-split">
            <h4>
              Recent Conversations
            </h4>
          </div>

          <div className="panel-body panel-title-style user-list conversation-scroll">
            <br />
            {this.state.userList.map((user) => {
              return (
                <div key={user._id}>
                  <a href="#" onClick={(e) => this.handleRemoveRecentChat(e, user._id)}>
                    <div className="pull-right">
                      <span className="fa fa-times-circle"></span>
                    </div>
                  </a>
                  <a href="#" onClick={(e) => this.handleSwitchChat(e, user._id)}>
                    <div className="media">
                      <div className="media-left">
                        PIC
                      </div>
                      <div className="media-body">
                        <h5 className="media-heading">
                          {user.userName}
                        </h5>
                        <p> [The user's most recent message]</p>
                      </div>
                    </div>
                  </a>
                  <hr />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
