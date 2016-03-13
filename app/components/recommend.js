import React from 'react';
import Recommendation from './recommendation'
import {getUserData, setUserData, useRecommendation} from '../server';

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

    onAdd(id) {
	useRecommendation(this.props.userID, id, () => this.refresh());
    }

    render() {
	alert("Rendering recommendations");
	alert(JSON.stringify(this.state));
	if(this.state.userInfo) {
	return (
	    <div className="row">
	    {this.state.userInfo.recommendations.map((recommendation) => {
		return (
		    <Recommendation key={recommendation._id}
				    userId={this.props.userId}
				    song={recommendation.song}
				    artist={recommendation.artist}
				    reason={recommendation.reason}
				    onAdd={this.onAdd.bind(this)} />)})}
	    </div>
	)
	}
	else {
	    return null
	}
    }
}
