import React from 'react';
import { Link } from 'react-router';

export default class ForumRow extends React.Component {
  render() {
    return (
      <tr>
        <td className="discussion">
          <Link to={"/forum-topic/" +this.props.fid +this.props.id}>{this.props.title}</Link>
        </td>
        <td className="threads">
          {this.props.threadCount}
        </td>
        <td className="posts">
          2
        </td>
        <td className="lastdisc">
          <p className="prvw-p">
            <Link to={"/forum-thread/" + this.props.userID}>First Thread</Link>
          </p>
          <p className="prvw-p">
            XX-XX-XXXX XX:XX
          </p>
          <p className="prvw-p">
            <Link to={"/profile/" + 2}>Ned Stark</Link>
          </p>
        </td>
      </tr>
    )
  }
}
