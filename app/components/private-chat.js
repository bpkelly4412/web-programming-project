import React from 'react';
import PrivateChatConversation from './private-chat-conversation';
import RecentConversations from './recent-conversations';
import PrivateChatLiveHelp from './private-chat-live-help';
import {getUserData} from '../server';


export default class PrivateChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "otherUserID": 2
    }
  }

  refresh() {
    getUserData(this.state.otherUserID, (userData) => {
      this.setState(userData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  handleSwitchChat(otherUserID) {
    console.log(otherUserID);
    this.setState({"otherUserID": otherUserID})
    console.log(this.state.otherUserID)
  }

  render() {
    return (
      <div className="row">
        <RecentConversations userID={this.props.userID} otherUserID={this.state.otherUserID} handleSwitchChat={(otherUserID) => this.handleSwitchChat(otherUserID)} />
        <PrivateChatConversation userID={this.props.userID} otherUserID={this.state.otherUserID} />
        <PrivateChatLiveHelp userID={this.props.userID} otherUserID={this.state.otherUserID} handleSwitchChat={(otherUserID) => this.handleSwitchChat(otherUserID)} />
      </div>
    )
  }
}
