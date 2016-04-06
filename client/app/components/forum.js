import React from 'react';
import { getForum } from '../server';
import { Link } from 'react-router';


export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "topics": [
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
            },
            {
              "title": "",
              "threadCount": [],
              "postCount": []
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
                    <Link to={"/forum-topic/" + 0 + "/" + this.props.userID }>{this.state.topics[0].title}</Link>
                  </td>
                  <td className="threads">
                    {this.state.topics[0].threadCount}
                  </td>
                  <td className="posts">
                    {this.state.topics[0].postCount}
                  </td>
                  <td className="lastdisc">
                  </td>
                </tr>
                <tr>
                  <td className="discussion">
                    <Link to={"/forum-topic/" + 1 + "/" + this.props.userID }>{this.state.topics[1].title}</Link>
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
                    <Link to={"/forum-topic/" + 2 + "/" + this.props.userID }>{this.state.topics[2].title}</Link>
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
                    <Link to={"/forum-topic/" + 3 + "/" + this.props.userID }>{this.state.topics[3].title}</Link>
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
                    <Link to={"/forum-topic/" + 4 + "/" + this.props.userID }>{this.state.topics[4].title}</Link>
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
                    <Link to={"/forum-topic/" + 5 + "/" + this.props.userID }>{this.state.topics[5].title}</Link>
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
                    <Link to={"/forum-topic/" + 6 + "/" + this.props.userID }>{this.state.topics[6].title}</Link>
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
                    <Link to={"/forum-topic/" + 7 + "/" + this.props.userID }>{this.state.topics[7].title}</Link>
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
                    <Link to={"/forum-topic/" + 8 + "/" + this.props.userID }>{this.state.topics[8].title}</Link>
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
                    <Link to={"/forum-topic/" + 9 + "/" + this.props.userID }>{this.state.topics[9].title}</Link>
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
                    <Link to={"/forum-topic/" + 10 + "/" + this.props.userID }>{this.state.topics[10].title}</Link>
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
                    <Link to={"/forum-topic/" + 11 + "/" + this.props.userID }>{this.state.topics[11].title}</Link>
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
                    <Link to={"/forum-topic/" + 12 + "/" + this.props.userID }>{this.state.topics[12].title}</Link>
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
                    <Link to={"/forum-topic/" + 13 + "/" + this.props.userID }>{this.state.topics[13].title}</Link>
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
                    <Link to={"/forum-topic/" + 14 + "/" + this.props.userID }>{this.state.topics[14].title}</Link>
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
                    <Link to={"/forum-topic/" + 15 + "/" + this.props.userID }>{this.state.topics[15].title}</Link>
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
                    <Link to={"/forum-topic/" + 16 + "/" + this.props.userID }>{this.state.topics[16].title}</Link>
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
                    <Link to={"/forum-topic/" + 17 + "/" + this.props.userID }>{this.state.topics[17].title}</Link>
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
                    <Link to={"/forum-topic/" + 18 + "/" + this.props.userID }>{this.state.topics[18].title}</Link>
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
                    <Link to={"/forum-topic/" + 19 + "/" + this.props.userID }>{this.state.topics[19].title}</Link>
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
                    <Link to={"/forum-topic/" + 20 + "/" + this.props.userID }>{this.state.topics[20].title}</Link>
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
                    <Link to={"/forum-topic/" + 21 + "/" + this.props.userID }>{this.state.topics[21].title}</Link>
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
                    <Link to={"/forum-topic/" + 22 + "/" + this.props.userID }>{this.state.topics[22].title}</Link>
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
                    <Link to={"/forum-topic/" + 23 + "/" + this.props.userID }>{this.state.topics[23].title}</Link>
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
                    <Link to={"/forum-topic/" + 24 + "/" + this.props.userID }>{this.state.topics[24].title}</Link>
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
                    <Link to={"/forum-topic/" + 25 + "/" + this.props.userID }>{this.state.topics[25].title}</Link>
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
                    <Link to={"/forum-topic/" + 26 + "/" + this.props.userID }>{this.state.topics[26].title}</Link>
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
