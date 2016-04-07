import React from 'react';
import { Link } from 'react-router';
import { getTopic } from '../server';
import ForumPostRow  from './forum-post-row';


export default class ForumThread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "thread": {
        "title": "Empty",
        "postCount": [],
        "posts": [
          {
            "author": 0,
            "postDate": 1000000000000,
            "contents": "Empty"
          }
        ]
      }
    }
  }

  refresh() {
     getTopic(this.props.category, this.props.tid, (topicData) => {
       this.setState({thread: topicData.threads[this.props.thid]})
     });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
    <div className="col-md-12 main">
        <div className="row forum-header">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><Link to={"/home/" + this.props.userId}>Home</Link></li>
              <li>
                <Link to={"/forum/" + this.props.userId}>Forums</Link>
              </li>
              <li>
                <Link to={"/forum-topic/" + this.props.tid + "/" + this.props.category + "/" + this.props.userId}>General Forte Discussion</Link>
              </li>
              <li className="active">
                {this.state.thread.title}
              </li>
            </ol>
            <h2> Forums: {this.state.thread.title} </h2>
            <div className="row">
              <div className="col-md-3">
                <button type="button" className="btn btn-default cr-btn">
                  <Link to={"/forum-newpost/" + this.props.thid + "/" +  this.props.tid + "/" + this.props.category + "/" + this.props.userId}><span className="glyphicon glyphicon-pencil" /> Reply
                  </Link>
                </button>
              </div>
              <div className="col-md-4 col-md-offset-5">
                <nav>
                  <ul className="pagination pagination-sm pull-right">
                    <li className="disabled">
                      <a href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="active">
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li>
                      <a href="#">5</a>
                    </li>
                    <li>
                      <a href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Boards */}
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              {
                this.state.thread.posts.map((post,i) => {
                  return (
                    <ForumPostRow key={i}
                      author = {post.author}
                      date = {post.postDate}
                      contents = {post.contents} />
                  );
                })}
            </table>
          </div>
        </div>
        <div className="row nav-btm">
          <div className="col-md-3">
            <button type="button" className="btn btn-default cr-btn">
              <Link to={"/forum-newpost/" + this.props.thid + "/" +  this.props.tid + "/" + this.props.category + "/" + this.props.userId}><span className="glyphicon glyphicon-pencil" /> Reply
              </Link>
            </button>
          </div>
          <div className="col-md-4 col-md-offset-5">
            <nav>
              <ul className="pagination pagination-sm pull-right">
                <li className="disabled">
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li className="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
)
}
}
