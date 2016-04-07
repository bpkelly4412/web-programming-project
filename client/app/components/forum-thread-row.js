import React from 'react';
import { Link } from 'react-router';

export default class ForumThreadRow extends React.Component {
  render() {
    return (
      <tr>
        <td className="discussion">
          <Link to={"/forum-thread/" +  this.props.thid + "/" + this.props.tid + "/" + this.props.category + "/" + this.props.id }>{this.props.title}</Link>
        </td>
        <td className="threads">
          {this.props.replyCount}
        </td>
        <td className="posts">
          0
        </td>
        <td className="lastdisc">
        </td>
      </tr>
    )
  }
}
