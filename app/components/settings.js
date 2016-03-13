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

    handlePublicClick(e){
	this.setState({profile_public: !this.state.profile_public}, () => this.refresh());
	console.log(JSON.stringify(this.state));
	setUserData(this.state, () => this.refresh());
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
		   checked={(this.state.public_profile !== "") ? this.state.public_profile : true}
		   onChange={(e) => this.handlePublicClick(e)}
	    />
	  </div>
	</div>
      </div>
      )
    }
}
