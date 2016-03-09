import React from 'react';
import PrivateChatMessage from './private-chat-message';
import PrivateChatMessageEntry from './private-chat-conversation-entry';
import {getChatConversations, sendMessage, createNewChatlog} from '../server';

export default class PrivateChatConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "chatlogs": [
      {
        "otherUser": 2,
        "messages": [
          {
            "author": {},
            "content": ""
          }
        ]
      }
    ]}
  }

  refresh() {
    getChatConversations(this.props.userID, (chatData) => {
      this.setState(chatData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  onPost(messageContents) {
    var otherUserIndex = this.getOtherUser();
    sendMessage(this.props.userID, otherUserIndex, messageContents, () => {
      this.refresh();
    });
  }

  getOtherUser() {
    for (var i = 0; i < this.state.chatlogs.length; i++) {
      //console.log(this.state.chatlogs[0].otherUser_id);
      //console.log(this.props.otherUserID);
      if (2 === this.props.otherUserID)
        return i;
    }

    createNewChatlog(this.props.userID, this.props.otherUserID, () => {
      this.refresh();
    });
  }
  /**
  {this.state.chatlogs.forEach((chatlog) => {
    if (chatlog.otherUser._id === this.props.otherUserID) {
      return index;
    }

  })}

  {this.state.chatlogs.map((chatlog, i) => {
    if(chatlog.otherUser === 2) {
      {chatlog.messages.map((message, i) => {
        return (
          <PrivateChatMessage key={i}
            author={message.author}
            content={message.content}
            userID={this.props.userID} />
        );
      })}
    }
  })}*/

  render() {
    var otherUserIndex = this.getOtherUser();

    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body panel-title-style chat-split">
            <a href="private-chat-popup-open.html" className="pull-right">
              <span className="glyphicon glyphicon-new-window" /> Portable Chat Window
            </a>
            <h4>
              <a href="#">
                {this.state.chatlogs[otherUserIndex].otherUser.userName}
              </a>
              <span className={this.state.chatlogs[otherUserIndex].otherUser.status}> ●</span>
            </h4>
          </div>

          <div className="panel-body panel-title-style chat-scroll">
            {this.state.chatlogs[otherUserIndex].messages.map((message, i) => {
              return (
                <PrivateChatMessage key={i}
                  author={message.author}
                  content={message.content}
                  userID={this.props.userID} />
              );
            })}
          </div>

          <PrivateChatMessageEntry onPost={(messageContents) => this.onPost(messageContents)}/>

        </div>
      </div>
    )
  }
}
