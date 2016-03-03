import React from 'react';


export default class PrivateChat extends React.Component {
  render() {
    return (
      <div className="row">
        <div id="recent-convos" className="col-md-3">
          <div className="panel panel-default">
            <div className="panel-body panel-title-style img-rounded panel-scroll">
              <h4>
                Recent Conversations
              </h4>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 1
                    </h5>
                    <span className="badge badge-style pull-right">2</span>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media convo-active">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 2
                    </h5>
                    <p> Hello, this is Bob 2!</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 3
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 4
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 5
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 6
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 7
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 8
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 9
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 10
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
              <hr />
              <a href="#">
                <div className="media">
                  <div className="media-left">
                    PIC
                  </div>
                  <div className="media-body">
                    <h5 className="media-heading">
                      Bob 11
                    </h5>
                    <p> blah blah blah blah</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body panel-title-style chat-split">
              <a
                href="private-chat-popup-open.html"
                className="pull-right">
                <span className="glyphicon glyphicon-new-window" /> Portable Chat Window
                </a>
                <h4>
                  <a href="#">
                    Bob 2
                  </a>
                  <span className="online">●</span>
                </h4>
              </div>
              <div className="panel-body panel-title-style chat-scroll">
                <p />
                <div className="chat-bubble left-speech">
                  Hello, this is Bob 2!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble right-speech">
                  Hello, this is Username!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble right-speech">
                  Hello, this is Username! I need to take up two rows of text to show that I work that way so here we go!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble right-speech">
                  Wow that worked great!
                </div>
                <p />
                <br />
                <br />
                <br />
                <p style={{paddingLeft: 33}}> ________________________Today________________________ </p>
                <p />
                <div className="chat-bubble right-speech">
                  Hello, this is Username!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble left-speech">
                  Hello, this is Bob 2!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble right-speech">
                  Hello, this is Username!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble left-speech">
                  Hello, this is Bob 2!
                </div>
                <p />
                <br />
                <br />
                <p />
                <div className="chat-bubble left-speech">
                  Hello, this is Bob 2!
                </div>
                <p />
                <br />
                <br />
              </div>
              <div className="panel-footer panel-title-style">
                <div className="media">
                  <div className="media-body">
                    <div className="input-group">
                      <textarea
                        className="form-control"
                        style={{color: '#ffffff'}}
                        rows={3}
                        placeholder="Enter text here..." />
                      <div
                        className="input-group-btn btn-group-vertical"
                        role="group">
                        <button
                          className="btn btn-default chat-button"
                          type="button">
                          <span className="glyphicon glyphicon-sunglasses" />
                        </button>
                        <button
                          className="btn btn-default chat-button"
                          type="button">
                          <span className="glyphicon glyphicon-pencil" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-body panel-title-style img-rounded user-list user-list-scroll">
                <ul className="nav nav-tabs">
                  <li role="presentation">
                    <a href="#">Friends</a>
                  </li>
                  <li
                    role="presentation"
                    className="chat-tab-active">
                    <a href="#">
                      Genre Help
                    </a>
                  </li>
                </ul>
                <hr />
                Rock
                <ul className="user-list-padding">
                  <a href="#">
                    Rock Expert 1 <span className="online">●</span>
                </a>
                <br />
                <a href="#">
                  Rock Expert 2 <span className="online">●</span>
              </a>
              <br />
              <a href="#">
                Rock Expert 3 <span className="away">●</span>
            </a>
            <br />
            <a href="#">
              Rock Expert 4 <span className="away">●</span>
          </a>
        </ul>
        Electronic
        <ul className="user-list-padding">
          <a href="#">
            Electronic Expert 1 <span className="online">●</span>
        </a>
        <br />
        <a href="#">
          Electronic Expert 2 <span className="online">●</span>
      </a>
      <br />
      <a href="#">
        Electronic Expert 3 <span className="away">●</span>
    </a>
  </ul>
  Ambient
  <ul className="user-list-padding">
    <a href="#">
      Ambient Expert 1 <span className="online">●</span>
  </a>
  <br />
  <a href="#">
    Ambient Expert 2 <span className="online">●</span>
</a>
</ul>
Metal
<ul className="user-list-padding">
  <a href="#">
    Metal Expert 1 <span className="away">●</span>
</a>
<br />
<a href="#">
  Metal Expert 2 <span className="away">●</span>
</a>
</ul>
Hip-Hop
<ul className="user-list-padding">
  <a href="#">
    Hip-Hop Expert 1 <span className="online">●</span>
</a>
<br />
<a href="#">
  Hip-Hop Expert 2 <span className="online">●</span>
</a>
<br />
<a href="#">
  Hip-Hop Expert 3 <span className="online">●</span>
</a>
</ul>
Indie
<ul className="user-list-padding">
  <a href="#">
    Indie Expert 1 <span className="online">●</span>
</a>
<br />
<a href="#">
  Indie Expert 2 <span className="online">●</span>
</a>
<br />
<a href="#">
  Indie Expert 3 <span className="online">●</span>
</a>
<br />
<a href="#">
  Indie Expert 4 <span className="online">●</span>
</a>
<br />
<a href="#">
  Indie Expert 5 <span className="away">●</span>
</a>
</ul>
</div>
</div>
</div>
</div>

)
}
}
