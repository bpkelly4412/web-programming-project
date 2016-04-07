import React from 'react';
import {unixTimeToString} from '../util';
import { Link } from 'react-router';
import { getUserName } from '../server';

export default class ForumPostRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "userName": "Empty"
      }
    }

  refresh() {
     getUserName(this.props.author, (userName) => {
       this.setState({userName: userName})
     });
  }

  


  render() {
    return (
      <tbody>
      <tr className="board-title">
        <td>
          {unixTimeToString(this.props.date)}
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td>
          <Link to={"/profile/" + this.props.author}>{this.state.userName}</Link>
        </td>
        <td>
          {this.props.contents}
        </td>
      </tr>
      </tbody>
    )
  }
}
