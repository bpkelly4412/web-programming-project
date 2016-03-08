import React from 'react';
export default class Forum extends React.Component {
  render() {
    return (
      <div className="main">
        {/* Forums Header*/}
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Home</a>
              </li>
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
                    <a href="forums-gen.html">
                      General Forte Discussion
                    </a>
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
                    <a href="#">
                      Help and Suggestions
                    </a>
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
                    <a href="#">Off-Topic</a>
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
                    <a href="#">
                      Music General
                    </a>
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
                    <a href="#">Polls/Quizzes/Games</a>
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
                    <a href="#">Ambient</a>
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
                    <a href="#">Classical</a>
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
                    <a href="#">Electronic</a>
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
                    <a href="#">Folk</a>
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
                    <a href="#">Hip-Hop</a>
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
                    <a href="#">Indie</a>
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
                    <a href="#">Jazz/Blues</a>
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
                    <a href="#">Metal</a>
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
                    <a href="#">Pop</a>
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
                    <a href="#">Rock</a>
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
                    <a href="#">
                      Games General
                    </a>
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
                    <a href="#">Pols/Quizzes/Games</a>
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
                    <a href="#">Action-Adventure</a>
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
                    <a href="#">Fighter</a>
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
                    <a href="#">FPS/Shooters</a>
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
                    <a href="#">Fighters</a>
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
                    <a href="#">JRPGs</a>
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
                    <a href="#">MOBAs/MMOs</a>
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
                    <a href="#">Platformers</a>
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
                    <a href="#">
                      Sandbox RPGs
                    </a>
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
                    <a href="#">Sports</a>
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
                    <a href="#">Strategy</a>
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
                    <a href="#">Visual Novel/Adventure </a>
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
