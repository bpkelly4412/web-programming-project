import React from 'react';
import {getUserData} from '../server';
export default class Settings extends React.Component {

    constructor(props) {
	super(props);
	this.state = { value: "" };
    }

    refresh() {
	getUserData(this.props.userID, (userData) => {
	    this.setState(userData);
	});
    }

    componentDidMount() {
	this.refresh();
    }

    handleChange(event) {
	this.setState( {value: event.target.value} );
    }
    render() {
	return (
      <div className="col-md-10 col-md-offset-1 transparent-background">
        <div className="row settings-head">
          <div className="settings-header-text">
	   {this.state.userName}'s Settings
          </div>
	</div>
	<div className="row settings-row">
	  <div className="col-md-4">
	    Public profile:
	  </div>
	  <div className="col-md-2">
            <input type="checkbox"
                   checked={this.state.public}
                   onChange={this.handleChange.bind(this, 'public')}
		   />
	  </div>
	</div>
	<div className="row settings-row">
	  <div className="col-md-4">
	    Show Recommendations:
	  </div>
	  <div className="col-md-2">
	    <input type="checkbox"
                   checked={this.state.public}
                   onChange={this.handleChange.bind(this, 'recommend')}
		   />
	  </div>
	</div>
	<div className="btn-group pull-left" role="group">
            <button
              type="button"
              className="btn btn-default">
              Submit
            </button>
          </div>
      </div>
      )
    }
}
