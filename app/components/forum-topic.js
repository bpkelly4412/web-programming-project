import React from 'react';
export default class ForumTopic extends React.Component {
  render() {
    return (
        <div className="main">
          {/* Forums Header*/}
          <div className="row">
            <div className="row forum-header">
              <div className="col-md-12">
                <ol className="breadcrumb">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="forums.html">Forums</a></li>
                  <li className="active">General Forte Discussion</li>
                </ol>
                <h2> Forums: General Forte Discussion</h2>
                <div className="row">
                  <div className="col-md-3">
                    <div className="btn-group" role="group" aria-label="...">
                      <a role="button" href="forums-newthread.html" className="btn btn-default cr-btn">
                        <span className="glyphicon glyphicon-comment" /> New Thread</a>
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
                        <a href="forums-post.html">First Thread</a>
                      </td>
                      <td className="threads">
                        1
                      </td>
                      <td className="posts">
                        1
                      </td>
                      <td className="lastdisc">
                        <p className="prvw-p">XX-XX-XXXX XX:XX</p>
                        <p className="prvw-p"><a href="#">USER_TWO</a></p>
                      </td>
                    </tr>
                    <tr>
                      <td className="discussion">
                        <a href="#">Let's Discuss</a>
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
                  <a role="button" href="forums-newthread.html" className="btn btn-default cr-btn">
                    <span className="glyphicon glyphicon-comment" /> New Thread</a>
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
        )
    }
  }
