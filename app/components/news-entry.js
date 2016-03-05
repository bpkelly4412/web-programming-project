import React from 'react';

export default class NewsEntry extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-body panel-body-style img-rounded">
            <a href="#"><h3>{this.props.title}}</h3></a>
            <div className="news-text">
              <p>{this.props.contents}</p>
            </div>
            <div className="date-stamp">
              {this.props.publishDate}
            </div>
            <div className="read-more">
              <a href="#"> Read more... </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
