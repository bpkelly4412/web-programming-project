import React from 'react';
import Recommendation from './recommendation'
import {getUserData, setUserData, useRecommendation} from '../server';

export default class Recommend extends React.Component {

    constructor(props) {
	super(props);
	this.state = { value: "" };
	this.onChildChanged = this.onChildChanged.bind(this);
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

    onAdd(id) {
	const recommendations = this.state.userInfo.recommendations.filter(recommendation => recommendation.id !== id);
	this.setState({ userInfo.recommendations : recommendations });

	useRecommendation(this.props.userID, id, () > this.refresh);


    render() {
	return (
	    {this.state.userInfo.recommendations.map((recommendation) => {
		return (
		    <Recommendation key={recommendation._id}
				    userId={this.props.userId}
				    song={recommendation.song}
				    artist={recommendation.artist}
				    reason={recommendation.reason}
				    onAdd={this.onAdd.bind(this)} />
		)
    }
}
