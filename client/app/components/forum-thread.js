import React from 'react';
import { Link } from 'react-router';
import { getTopic } from '../server';


export default class ForumThread extends React.Component {

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
                First Thread
              </li>
            </ol>
            <h2> Forums: First Thread</h2>
            <div className="row">
              <div className="col-md-3">
                <button type="button" className="btn btn-default cr-btn">
                  <Link to={"/forum-newpost/" + this.props.thid + "/" +  this.props.tid + "/" + this.props.userID}><span className="glyphicon glyphicon-pencil" /> Reply
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
              <tbody>
                <tr className="board-title">
                  <td>
                    XX-XX-XXXX, XX:XX AM
                  </td>
                  <td>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to={"/profile/" + 1}>Jon Snow</Link>
                    <br />
                    <h6>
                      Join Date: Xxx XXXX
                    </h6>
                  </td>
                  <td>
                    Aut si rem a me pecuniam in Midiam elit. Nec ego in imperio elit. Id quod sum sub potestate felis. Etiam Id est - problema solvenda. Skyler est simplex partitio - introducam pecuniam, pecuniam launder. Id quod vobis deerat.
                    Qui nunc loqueris? Ecce qui cogitatis? Vos scitis quanta ego faciam annum Id est, ut ego dixi vobis non credunt. Scis quid si ne subito placuit ire in opus?
                  </td>
                </tr>
                <tr className="board-title">
                  <td>
                    XX-XX-XXXX, XX:XX AM
                  </td>
                  <td>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to={"/profile/" + 2}>Ned Stark</Link>
                    <br />
                    <h6>
                      Join Date: Xxx XXXX
                    </h6>
                  </td>
                  <td>
                    <p>
                      Sum expectantes. Ego hodie expectantes. Expectantes, et misit unum de pueris Gus interficere. Et suus vos. Nescio quis, qui est bonus usus liberi ad Isai? Qui nosti ... Quis dimisit filios ad necem ... hmm? Gus! Est, ante me factus singulis decem gradibus. Et nunc ad aliud opus mihi tandem tollendum est puer ille consensus et nunc fugit. Ipse suus obtinuit eam. Non solum autem illa, sed te tractantur in se trahens felis.
                      No! Hoc non credant? Gus habet cameras ubique placet. Audire te! Non, omnia novit, omnia simul. Ubi eras hodie? In Lab! Et vos nolite cogitare suus possible ut Tyrus de cigarette elevaverunt CAPSA vestris? Age! Tu non vides? Pompeius extrema partem es. Tu omne quod ille voluit.
                      Saule ... , ostendit quod hoc quidem ... hoc quod dixit, ... potuit adiutorium mihi, et educat me in tota vita nova facio certus ut Im non invenit. Ego quidem illius memini Saul. Gus sit amet interfíciat mei tota familia. Nunc opus est mihi iste. Saul ... nunc Saule.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row nav-btm">
          <div className="col-md-3">
            <button type="button" className="btn btn-default cr-btn">
              <Link to={"/forum-newpost/" + this.state._id}><span className="glyphicon glyphicon-pencil" /> Reply
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
