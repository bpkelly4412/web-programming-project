import React from 'react';
import {getUserData, setUserData} from '../server';

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

    handleCheckboxClick(e, type){
	this.state.settings[type] = !this.state.settings[type]
	setUserData(this.state.settings, () => this.refresh());
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
		   checked={this.state["settings"] ? this.state["settings"]["public_profile"] : false}
		   onChange={(e) => this.handleCheckboxClick(e, "public_profile")}
	    />
	  </div>
	</div>
      </div>
      )
    }
}
