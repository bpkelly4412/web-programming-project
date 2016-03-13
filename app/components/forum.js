import React from 'react';
import { getForum } from '../server';
import { Link } from 'react-router';


export default class Forum extends React.Component {

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
          "threads": []
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
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[0].id + this.props.userID }>{this.state.topics[0].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[0].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[0].postCount}
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
                    <Link to={"/forum-topic/" +this.state.topics[1].id + this.props.userID }>{this.state.topics[1].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[1].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[1].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[2].id + this.props.userID }>{this.state.topics[2].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[2].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[2].postCount}
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
                    <Link to={"/forum-topic/" +this.state.topics[3].id + this.props.userID }>{this.state.topics[3].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[3].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[3].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[4].id + this.props.userID }>{this.state.topics[4].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[4].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[4].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[5].id + this.props.userID }>{this.state.topics[5].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[5].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[5].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[6].id + this.props.userID }>{this.state.topics[6].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[6].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[6].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[7].id + this.props.userID }>{this.state.topics[7].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[7].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[7].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[8].id + this.props.userID }>{this.state.topics[8].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[8].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[8].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[9].id + this.props.userID }>{this.state.topics[9].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[9].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[9].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[10].id + this.props.userID }>{this.state.topics[10].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[10].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[10].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[11].id + this.props.userID }>{this.state.topics[11].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[11].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[11].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[12].id + this.props.userID }>{this.state.topics[12].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[12].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[12].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[13].id + this.props.userID }>{this.state.topics[13].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[13].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[13].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[14].id + this.props.userID }>{this.state.topics[14].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[14].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[14].postCount}
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
                    <Link to={"/forum-topic/" +this.state.topics[15].id + this.props.userID }>{this.state.topics[15].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[15].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[15].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[16].id + this.props.userID }>{this.state.topics[16].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[16].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[16].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[17].id + this.props.userID }>{this.state.topics[17].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[17].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[17].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[18].id + this.props.userID }>{this.state.topics[18].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[18].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[18].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[19].id + this.props.userID }>{this.state.topics[19].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[19].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[19].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[20].id + this.props.userID }>{this.state.topics[20].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[20].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[20].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[21].id + this.props.userID }>{this.state.topics[21].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[21].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[21].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[22].id + this.props.userID }>{this.state.topics[22].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[22].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[22].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[23].id + this.props.userID }>{this.state.topics[23].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[23].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[23].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[24].id + this.props.userID }>{this.state.topics[24].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[24].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[24].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[25].id + this.props.userID }>{this.state.topics[25].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[25].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[25].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" +this.state.topics[26].id + this.props.userID }>{this.state.topics[26].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[26].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[26].postCount}
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
