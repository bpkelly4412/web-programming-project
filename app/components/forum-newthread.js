import React from 'react';
export default class ForumThread extends React.Component {
  render() {
    return (
    <div>
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
