import React from 'react';
import { Link } from 'react-router';
import { postThread } from '../server';

export default class ForumNewThread extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    handleChange(e) {
      e.preventDefault();
     this.setState({ value: e.target.value});
    }

    handelChange(f){
      f.preventDefault()
      this.setState({title: f.target.value })
    }

    handlePost(e) {
         e.preventDefault();
         var newThreadText = this.state.value.trim();
         if (newThreadText !== "") {
           postThread(this.props.userID, this.props.tid, this.state.title, newThreadText, () => {
             // Database is now updated. Refresh the feed.
             this.refresh();
    });
           this.setState({value: ""});
         }
       }

  render(){
      return (
      <div className="col-md-12 main">
        <div className="row ">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><Link to={"/home/" + this.props.userID}>Home</Link></li>
              <li>
                <Link to={"/forum/" + this.props.userID}>Forums</Link>
              </li>
              <li>
                <Link to={"/forum-topic/" + this.props.tid + "/" + this.props.userID}>General Forte Discussion</Link>
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
              className="btn btn-default pull-right nav-btm cr-btn"type="submit">
              <Link to={"/forum-thread/" + this.state._id}>Submit</Link></button>
          </div>
        </div>
      </div>
    )
  }
}
