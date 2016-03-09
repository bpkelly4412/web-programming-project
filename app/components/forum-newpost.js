import React from 'react';
import { Link } from 'react-router';
import { getUserData } from '../server';

export default class ForumNewPost extends React.Component {

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
        <div className="row ">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <Link to={"/forum/" + this.state._id}>Forums</Link>
              </li>
              <li>
              <Link to={"/forum-topic/" + this.state._id}>General Forte Discussion</Link>
              </li>
              <li>
                <Link to={"/forum-thread/" + this.state._id}>First Thread</Link>
              </li>
              <li className="active">New Post</li>
            </ol>
            <h2> Forums: New Post</h2>
        </div>
      </div>
        <div className="row">
          <div className="col-md-12">
            <h4>
              Original Message:
            </h4>
            <div className="panel panel-default">
              <div className="panel-body panel-comment">
                USER_NAME said:
                <p className="tab">Aut si rem a me pecuniam in Midiam elit. Nec ego in imperio elit. Id quod sum sub potestate felis. Etiam Id est - problema solvenda. Skyler est simplex partitio - introducam pecuniam, pecuniam launder. Id quod vobis deerat.
                  Qui nunc loqueris? Ecce qui cogitatis? Vos scitis quanta ego faciam annum Id est, ut ego dixi vobis non credunt. Scis quid si ne subito placuit ire in opus?
                </p>
              </div>
            </div>
            <h4>
              Latest Message:
            </h4>
            <div className="panel panel-default">
              <div className="panel-body panel-comment">
                USER_TWO said:
                <p className="tab">Sum expectantes. Ego hodie expectantes. Expectantes, et misit unum de pueris Gus interficere. Et suus vos. Nescio quis, qui est bonus usus liberi ad Isai? Qui nosti ... Quis dimisit filios ad necem ... hmm? Gus! Est, ante me factus singulis decem gradibus. Et nunc ad aliud opus mihi tandem tollendum est puer ille consensus et nunc fugit. Ipse suus obtinuit eam. Non solum autem illa, sed te tractantur in se trahens felis.
                  No! Hoc non credant? Gus habet cameras ubique placet. Audire te! Non, omnia novit, omnia simul. Ubi eras hodie? In Lab! Et vos nolite cogitare suus possible ut Tyrus de cigarette elevaverunt CAPSA vestris? Age! Tu non vides? Pompeius extrema partem es. Tu omne quod ille voluit.
                  Tu nunc coci ejus. Tu autem cocus Lab et probavimus liceat mihi sine causa est nunc coci interficere. Reputo it! Suus egregie. Ut antecedat. Quod si putas me posse facere, ergo ante. Pone aute in caput, et nunc interficere. Faciat! Fac. Fac. Fac.
                  Saule ... , ostendit quod hoc quidem ... hoc quod dixit, ... potuit adiutorium mihi, et educat me in tota vita nova facio certus ut Im non invenit. Ego quidem illius memini Saul. Gus sit amet interfíciat mei tota familia. Nunc opus est mihi iste. Saul ... nunc Saule.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <textarea className="form-control" rows={15} />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <button
              className="btn btn-default pull-right nav-btm cr-btn"
              type="submit">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}
