import React from 'react';

export default class PrivateChatMessage extends React.Component {

/**
if (this.props.author._id === this.props.userID) {
  return (
    <div className="row">
    <p />
      <div className="chat-bubble right-speech">
        {this.props.content}
      </div>
    <p />
    </div>
  )
}
else {
  return (
    <div className="row">
    <p />
      <div className="chat-bubble left-speech">
        {this.props.content}
      </div>
    <p />
    </div>
  )
}
*/

  render() {
    return (
      <div>
        <div className="row">
        <p />
          <div className="chat-bubble left-speech">
            Hello, this is Bob 2!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble right-speech">
            Hello, this is Username!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble right-speech">
            Hello, this is Username! I need to take up two rows of text to show that I work that way so here we go!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble right-speech">
            Wow that worked great!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble right-speech">
            Hello, this is Username!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble left-speech">
            Hello, this is Bob 2!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble right-speech">
            Hello, this is Username!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble left-speech">
            Hello, this is Bob 2!
          </div>
        <p />
        </div>

        <div className="row">
        <p />
          <div className="chat-bubble left-speech">
            Hello, this is Bob 2!
          </div>
        <p />
        </div>
      </div>
    )
  }
}
