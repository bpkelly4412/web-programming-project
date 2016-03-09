import React from 'react';
import { Link } from 'react-router';
import { getUserData } from '../server';

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  refresh() {
    getUserData(this.props.userID, (userData) => {
      this.setState(userData);
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
            <ol className="breadcrumb">
              <li><Link to={"/home/" + this.state._id}>Home</Link></li>
              <li className="active">Forums</li>
            </ol>
            <h2> Forums</h2>
          </div>
        </div>
        {/* Boards */}
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered">
              <tbody>
                <tr className="table-header">
                  <td>
                    Board Title
                  </td>
                  <td>
                    Threads
                  </td>
                  <td>
                    Posts
                  </td>
                  <td>
                    Last Discussion
                  </td>
                </tr>
                <tr className="board-title">
                  <td>
                    BBQ Forte
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
                    <Link to={"/forum-topic/" + this.state._id}>General Forte Discussion</Link>
                  </td>
                  <td className="threads">
                    2
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
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Help and Suggestions</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Off-Topic</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr className="board-title">
                  <td>
                    Music
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
                    <Link to={"/forum-topic/" + this.state._id}>Music General</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Polls/Quizzes/Games</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Ambient</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Classical</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Electronic</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Folk</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Hip-Hop</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Indie</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Jazz/Blues</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Metal</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Pop</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Rock</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr className="board-title">
                  <td>
                    Games
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
                    <Link to={"/forum-topic/" + this.state._id}>Games General</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Polls/Quizzes/Games</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Action-Adventure</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Fighters</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Shooters</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>JRPGs</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>MOBAs/MMOs</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Platformers</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Sandbox RPGs</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Sports</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Strategy</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.state._id}>Visual Novel/Adventure</Link>
                  </td>
                  <td className="threads">
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    )
  }
}
