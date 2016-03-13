import React from 'react';
import { getForum } from '../server';
import ForumRow from './forum-row';
import { Link } from 'react-router';


export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = { topics: [
      {},{},{}
    ] };
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
            <ol className="breadcrumb">
              <li><Link to={"/home/" + this.props.userID}>Home</Link></li>
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
                  {this.state.topics.map((entry, i) => {
                    return (
                      <ForumRow key={i}
                        title={entry.title}
                        threadCount={entry.contents}
                        id={this.props.userID}
                        fid={entry._id}/>
                    );
                  })}
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.props.userID}>General Forte Discussion</Link>
                  </td>
                  <td className="threads">
                    2
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
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.props.userID}>Help and Suggestions</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[1]._id}
                  </td>
                  <td className="posts">
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + this.props.userID}>Off-Topic</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Music General</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Polls/Quizzes/Games</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Ambient</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Classical</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Electronic</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Folk</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Hip-Hop</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Indie</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Jazz/Blues</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Metal</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Pop</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Rock</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Games General</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Polls/Quizzes/Games</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Action-Adventure</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Fighters</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Shooters</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>JRPGs</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>MOBAs/MMOs</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Platformers</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Sandbox RPGs</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Sports</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Strategy</Link>
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
                    <Link to={"/forum-topic/" + this.props.userID}>Visual Novel/Adventure</Link>
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
