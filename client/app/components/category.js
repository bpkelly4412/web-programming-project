import React from 'react';
import ForumRow from './forum-row';

export default class Category extends React.Component{

  constructor(props) {
    super(props);
    this.state = { topics: this.props.topics}
  }

  render() {
    return (
      <div>
      <tr className="board-title">
        <td>
          {this.props.title}
        </td>
        <td>
        </td>
        <td>
        </td>
        <td>
        </td>
      </tr>
      {
        this.state.topics.map((topicsItem, i) => {
        return (
          <ForumRow key = {i}
            fid = {1}
            id = {i}
            title = {topicsItem.title}
            threadCount = {topicsItem.threadCount}
            postCount = {topicsItem.postCount}
          />
        );
      })}
      </div>
    )
  }
}
