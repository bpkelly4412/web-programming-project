import React from 'react';
import PrivateChatConversation from './private-chat-conversation';
import RecentConversations from './recent-conversations';
import PrivateChatLiveHelp from './private-chat-live-help';


export default class PrivateChat extends React.Component {
  render() {
    return (
      <div className="row">
        <RecentConversations />
        <PrivateChatConversation />
        <PrivateChatLiveHelp />
      </div>
    )
  }
}
