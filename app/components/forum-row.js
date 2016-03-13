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
            <a href="forums-post.html">
              First Thread
            </a>
          </p>
          <p className="prvw-p">
            XX-XX-XXXX XX:XX
          </p>
          <p className="prvw-p">
            <a href="#">USER_TWO</a>
          </p>
        </td>
      </tr>
    )
  }
}
