import React from 'react';
import PrivateChatConversation from './private-chat-conversation';
import RecentConversations from './recent-conversations';
import PrivateChatLiveHelp from './private-chat-live-help';
import {getUserData, updateChattingWith} from '../server';


export default class PrivateChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: {} }
  }

  refresh() {
    getUserData(this.props.userID, (userData) => {
      this.setState(userData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  handleSwitchChat(otherID) {
    //console.log(otherID);
    updateChattingWith(this.props.userID, otherID, () => {
      this.refresh();
    })
    //console.log(this.state.chattingWith);
  }

  render() {
    return (
      <div className="row">
        <RecentConversations userID={this.props.userID} otherUserID={this.state.chattingWith} handleSwitchChat={(otherUserID) => this.handleSwitchChat(otherUserID)} />
        <PrivateChatConversation userID={this.props.userID} otherUserID={this.state.chattingWith} />
        <PrivateChatLiveHelp userID={this.props.userID} otherUserID={this.state.chattingWith} handleSwitchChat={(otherUserID) => this.handleSwitchChat(otherUserID)} />
      </div>
    )
  }
}
