import React from 'react';

export default class PrivateChatLiveHelpUserList extends React.Component {
  render() {
    return (
      <div>
        {this.props.genre}
        <ul className="user-list-padding">
          {this.props.userList.map((user) => {
            return(
              <div key={user._id}>
                <a href="#">
                  {user.userName} <span className={user.status}>●</span>
                </a>
                <br/>
              </div>
            );
          })}
        </ul>
      </div>
    )
  }
}
