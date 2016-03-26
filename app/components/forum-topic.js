import React from 'react';
import { getTopic } from '../server';
import { Link } from 'react-router';


export default class ForumTopic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    "_id": 1,
    "title": "General Forte Discussion",
    "category": "forte",
    "threadCount": [2],
    "postCount": [2],
    "threads": []
      }
  }

  refresh() {
     getTopic(this.props.tid, (topicData) => {
       this.setState({topicData})
     })
  }

  componentDidMount() {
    this.refresh();
  }


  render() {
    return (
        <div className="col-md-12 main">
          {/* Forums Header*/}
          <div className="row">
            <div className="col-md-12">
            <div className="row forum-header">
              <div className="col-md-12">
                <ol className="breadcrumb">
                  <li><Link to={"/home/" + this.props.userID}>Home</Link></li>
                  <li><Link to={"/forum/" + this.props.userID}>Forums</Link></li>
                  <li className="active">{this.state.title}</li>
                </ol>
                <h2> {this.state.title}</h2>
                <div className="row">
                  <div className="col-md-3">
                    <div className="btn-group" role="group" aria-label="...">
                      <button type="button" className="btn btn-default cr-btn">
                        <Link to={"/forum-newthread/" + this.props.tid + "/" + this.props.userID}><span className="glyphicon glyphicon-comment" /> New Thread
                        </Link>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4 col-md-offset-5">
                    <nav>
                      <ul className="pagination pagination-sm pull-right">
                        <li className="disabled">
                          <a href="#" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                          </a>
                        </li>
                        <li className="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
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
            {/* Boards*/}
            <div className="row">
              <div className="col-md-12">
                <table className="table table-bordered">
                  <tbody><tr className="table-header">
                      <td>
                        Thread/Thread Starter
                      </td>
                      <td>
                        Replies
                      </td>
                      <td>
                        Views
                      </td>
                      <td>
                        Last Post
                      </td>
                    </tr>
                    <tr className="board-title">
                      <td>
                        General Forte Discussion
                      </td>
                      <td>
                      </td>
                      <td>
                      </td>
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td className="discussion">
                        <Link to={"/forum-thread/" + this.state._id + "/" + this.props.tid + "/" + this.props.userID}>First Thread</Link>
                      </td>
                      <td className="threads">
                        1
                      </td>
                      <td className="posts">
                        1
                      </td>
                      <td className="lastdisc">
                        <p className="prvw-p">XX-XX-XXXX XX:XX</p>
                        <p className="prvw-p"><Link to={"/profile/" + 2}>Ned Stark</Link></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="discussion">
                        <Link to={"/forum-thread/"  + this.state._id + "/" + this.props.tid + "/" + this.props.userID}>Let's Discuss</Link>
                      </td>
                      <td className="threads">
                      </td>
                      <td className="posts">
                      </td>
                      <td className="lastdisc">
                      </td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
            <div className="row nav-btm">
              <div className="col-md-3">
                <div className="btn-group" role="group" aria-label="...">
                  <button type="button" className="btn btn-default cr-btn">
                    <Link to={"/forum-newthread/" + this.props.tid + "/" + this.props.userID}><span className="glyphicon glyphicon-comment" /> New Thread
                    </Link>
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-md-offset-5">
                <nav>
                  <ul className="pagination pagination-sm pull-right">
                    <li className="disabled">
                      <a href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
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
        </div>
        )
    }
  }
