import React from 'react';
import {getRecentConversations} from '../server';

export default class RecentConversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] };
  }

  refresh() {
    getRecentConversations(this.props.userID, (recentConversations) => {
      this.setState(recentConversations);
    });
  }

  componentDidMount() {
    this.refresh();
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
                <div>
                  <a href="#">
                    <div className="pull-right">
                      <span className="fa fa-times-circle"></span>
                    </div>
                  </a>  
                  <a href="#">
                    <div className="media">
                      <div className="media-left">
                        PIC
                      </div>
                      <div className="media-body">
                        <h5 className="media-heading">
                          {user.userName}
                        </h5>
                        <p> Most recent message here but I don't know how</p>
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
