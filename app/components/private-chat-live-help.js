import React from 'react';

export default class PrivateChatLiveHelp extends React.Component {
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
              <br />
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
              <br />
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
              <br />
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
              <br />
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
              <br />
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
              <br />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
