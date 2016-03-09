import React from 'react';
import { Link } from 'react-router';
import { getUserData } from '../server';


export default class ForumNewThread extends React.Component {

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

  render(){
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
              <li className="active">New Thread</li>
            </ol>
            <h2> Forums: New Thread</h2>
        </div>
      </div>
        <div className="row">
          <div className="col-md-8 ">
            <div className="input-group">
              <span
                className="input-group-addon cr-title"
                id="basic-addon1">Title:</span>
              <input
                type="text"
                className="form-control"
                aria-label="Title"
                aria-describedby="basic-addon1" />
            </div>
            <br />
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
