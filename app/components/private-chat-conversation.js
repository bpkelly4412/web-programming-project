import React from 'react';
import PrivateChatMessage from './private-chat-message';
import {getChatConversations} from '../server';

export default class PrivateChatConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatlogs: [] };
  }

  refresh() {
    getChatConversations(this.props.userID, (liveHelp) => {
      this.setState(liveHelp);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body panel-title-style chat-split">
            <a href="private-chat-popup-open.html" className="pull-right">
              <span className="glyphicon glyphicon-new-window" /> Portable Chat Window
            </a>
            <h4>
              <a href="#">
                Ned Stark
              </a>
              <span className="online"> ●</span>
            </h4>
          </div>

          <div className="panel-body panel-title-style chat-scroll">
            /**{this.state.chatlogs.map((chatlog, i) => {
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
            <PrivateChatMessage />
          </div>

          <div className="panel-footer panel-title-style">
            <div className="media">
              <div className="media-body">
                <div className="input-group">
                  <textarea className="form-control" style={{color: '#ffffff'}} rows={3} placeholder="Enter text here..." />
                  <div className="input-group-btn btn-group-vertical" role="group">
                    <button className="btn btn-default chat-button" type="button">
                      <span className="glyphicon glyphicon-sunglasses" />
                    </button>
                    <button className="btn btn-default chat-button" type="button">
                      <span className="glyphicon glyphicon-pencil" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
