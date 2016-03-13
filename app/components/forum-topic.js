import React from 'react';
import { getForum } from '../server';
import { Link } from 'react-router';


export default class ForumTopic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          "_id": 1,
          "topics": [
            {
          "_id": 1,
          "title": "General Forte Discussion",
          "category": "forte",
          "threadCount": [2],
          "postCount": [2],
          "threads": [
            {
              "_id": 1,
              "title": "First Thread",
              "postCount": [1],
              "posts": [
                {
                "_id": 1,
                "author": 1,
                "postDate": 1453668480000,
                "contents": "Aut si rem a me pecuniam in Midiam elit. Nec ego in imperio elit. Id quod sum sub potestate felis. Etiam Id est - problema solvenda. Skyler est simplex partitio - introducam pecuniam, pecuniam launder. Id quod vobis deerat. Qui nunc loqueris? Ecce qui cogitatis? Vos scitis quanta ego faciam annum Id est, ut ego dixi vobis non credunt. Scis quid si ne subito placuit ire in opus?"
                },
                {
              "_id": 2,
              "author": 2,
              "postdate": 1453690800000,
              "contents": "Sum expectantes. Ego hodie expectantes. Expectantes, et misit unum de pueris Gus interficere. Et suus vos. Nescio quis, qui est bonus usus liberi ad Isai? Qui nosti ... Quis dimisit filios ad necem ... hmm? Gus! Est, ante me factus singulis decem gradibus. Et nunc ad aliud opus mihi tandem tollendum est puer ille consensus et nunc fugit. Ipse suus obtinuit eam. Non solum autem illa, sed te tractantur in se trahens felis."
                }
              ]
            },
            {
              "_id": 2,
              "title": "Let's Discuss",
              "postCount": [0],
              "posts": []
            }
          ]
          },
          {
          "_id": 2,
          "title": "Help and Suggestions",
          "category": "forte",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 3,
          "title": "Off-Topic",
          "category": "forte",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 4,
          "title": "Music General",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 5,
          "title": "Polls/Quizzes/Games",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 6,
          "title": "Ambient",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 7,
          "title": "Classical",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 8,
          "title": "Electronic",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 9,
          "title": "Folk",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 10,
          "title": "Hip-Hop",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 11,
          "title": "Indie",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 12,
          "title": "Jazz/Blues",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 13,
          "title": "Metal",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 14,
          "title": "Pop",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 15,
          "title": "Rock",
          "category": "music",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 16,
          "title": "Games General",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 17,
          "title": "Polls/Quizzes/Games",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 18,
          "title": "Action-Adventure",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 19,
          "title": "Fighters",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 20,
          "title": "Shooters",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 21,
          "title": "JRPGs",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 22,
          "title": "MOBAs/MMOs",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 23,
          "title": "Platformers",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 24,
          "title": "Sandbox RPGs",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 25,
          "title": "Sports",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 26,
          "title": "Strategy",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          },
          {
          "_id": 27,
          "title": "Visual Novel/Adventure",
          "category": "games",
          "threadCount": [0],
          "postCount": [0],
          "threads": []
          }
          ]
    };
  }

  refresh() {
    getForum((forumData) => {
      this.setState({forumData})
    });
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
                  <li><Link to={"/home/" + this.state._id}>Home</Link></li>
                  <li><Link to={"/forum/" + this.state._id}>Forums</Link></li>
                  <li className="active">General Forte Discussion</li>
                </ol>
                <h2> Forums: General Forte Discussion</h2>
                <div className="row">
                  <div className="col-md-3">
                    <div className="btn-group" role="group" aria-label="...">
                      <button type="button" className="btn btn-default cr-btn">
                        <Link to={"/forum-newthread/" + this.state._id}><span className="glyphicon glyphicon-comment" /> New Thread
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
                        <Link to={"/forum-thread/" + this.state._id}>First Thread</Link>
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
                        <Link to={"/forum-thread/" + this.state._id}>Let's Discuss</Link>
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
                    <Link to={"/forum-newthread/" + this.state._id}><span className="glyphicon glyphicon-comment" /> New Thread
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
