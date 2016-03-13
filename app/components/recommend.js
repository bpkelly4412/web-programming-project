import React from 'react';
import {getUserData, setUserData} from '../server';

export default class Recommend extends React.Component {

    constructor(props) {
	super(props);
	this.state = { value: "" };
    }

    refresh() {
	getUserData(this.props.userID, (userData) => {
	    this.setState({userInfo: userData});
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

      )
    }
}
