import React from 'react';
import { getUserData, getUserNickName} from '../server';


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editing: false, editSubmitted: false, editedNameValue: '', editedAboutValue: '', followers: [],
                  followerNickNames: [], following: [], followingNickNames: []};
  }

  onEditClick(e) {
    e.preventDefault();
    this.setState({
      editing: true,
      editSubmitted: false,
      editedValue: this.props.value
    });
  }

  onEditCancel(e) {
  e.preventDefault();
  this.setState({
    editing: false,
    editSubmitted: false
  });
}

onEdit(e) {
    e.preventDefault();
    this.props.onContentUpdate(this.state.editedValue);
    this.setState({
      editSubmitted: true
    });
  }

  handleEditChange(e) {
    e.preventDefault();
    this.setState({ editedValue: e.target.value });
  }

  componentWillReceiveProps() {
    if (this.state.editing && this.state.editSubmitted) {
      // Component has received its new status update text!
      this.setState({
        editing: false,
        editSubmitted: false
      });
    }
  }

  refresh() {
    getUserData(this.props.userID, (userData) => {
      var data = userData;
      data.followers.map( (followerID) => {
        getUserNickName(followerID, (nickname) => {
          this.state.followerNickNames.push(nickname);
         this.setState({followerNickNames: this.state.followerNickNames});
        });
      });
      data.following.map( (followingID) => {
        getUserNickName(followingID, (nickname) => {
          this.state.followingNickNames.push(nickname);
         this.setState({followingNickNames: this.state.followingNickNames});
        });
      });
      this.setState(data);
    });

  }

  render() {

    // Render the component differently based on state.
    if (this.state.editing) {
      return this.renderEdit();
    } else {
      return this.renderSaved();
    }
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  finishEdit(){
    this.setState({
      editing: false
    });
  }

  componentDidMount() {
    this.refresh();
  }


  renderSaved() {
    return (
      <div className="col-md-10 col-md-offset-1 transparent-background">
        <div className="row profile-row">
          <div className="profile-header-container">
            <div className="profile-header-img">
              <img
                className="img-circle"
                src="img/profile_pic_default.png" />
              {/* badge */}
              <div className="rank-label-container">
                <span className="label label-default rank-label username-under-picture">{this.state.nickName}</span>
              </div>
            </div>
          </div>
          <div className="btn-group pull-left" role="group">
            <button
              type="button"
              className="btn btn-default profile-button">
              FOLLOW
            </button>
          </div>
          <div
            className="btn-group pull-right"
            role="group">
            <button
              type="button"
              className="btn btn-default profile-button"
              onClick={this.edit.bind(this)}>
              <span className="glyphicon glyphicon-pencil"  />
            </button>
          </div>
          {/* end profile header container*/}
        </div>
        {/* end of profile pic row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Name:
          </div>
          <div className="col-md-4">
            {this.state.userName}
          </div>
        </div>
        {/*end of 3rd row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            About:
          </div>
          <div className="col-md-4">
            {this.state.about}
          </div>
        </div>
        {/*end of 4th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Favorite Artists:
          </div>
          <div className="col-md-4">
            Artist1, Artist2, Artist3, Artist5, Artist6, Artist Seven, Artist Eight
          </div>
        </div>
        {/*end of 5th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Favorite Games:
          </div>
          <div className="col-md-4">
            Game1, Game2, Game3, Game4, Game Five, Game Six, Game Seven
          </div>
        </div>
        {/*end of 6th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Following:
          </div>
          <div className="col-md-4">
            {
                this.state.followerNickNames.map( (nickname, i ) => {
                  return <a href="#" key = {i}>{nickname + ", "}</a>
                })
            }
          </div>
        </div>
        {/*end of 7th row*/}
        <div className="row profile-row">
          <div className="col-md-2 col-md-offset-4">
            Followers:
          </div>
          <div className="col-md-4">
            {
                this.state.followingNickNames.map( (nickname, i ) => {
                  return <a href="#" key = {i}>{nickname + ", "}</a>
                })
            }
          </div>
        </div>
        {/*end of 8th row*/}
      </div>

    )
  }
  renderEdit(){
    return(
    <div className="col-md-10 col-md-offset-1 transparent-background">
      <div className="row profile-row">
        <div className="profile-header-container">
          <div className="profile-header-img">
            <img
              className="img-circle"
              src="img/profile_pic_default.png" />
            {/* badge */}
            <div className="rank-label-container">
              <span className="label label-default rank-label username-under-picture">{this.state.nickName}</span>
            </div>
          </div>
        </div>
        <div className="btn-group pull-left" role="group">
          <button
            type="button"
            className="btn btn-default profile-button">
            FOLLOW
          </button>
        </div>
        <div
          className="btn-group pull-right"
          role="group">
          <button
            type="button"
            className="btn btn-default profile-button"
            onClick={this.finishEdit.bind(this)}>
            SAVE
          </button>
        </div>
        {/* end profile header container*/}
      </div>
      {/* end of profile pic row*/}
      {/*end of 2nd row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          Name:
        </div>
        <div className="col-md-4">
          <input type="text"
             ref={(e) => e ? e.selectionStart = this.state.userName.length : null}
             autoFocus={true}
             defaultValue={this.state.userName}/>
        </div>
      </div>
      {/*end of 3rd row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          About:
        </div>
        <div className="col-md-4">
          <input type="text"
             ref={(e) => e ? e.selectionStart = this.state.about.length : null}
             autoFocus={true}
             defaultValue={this.state.about}/>
        </div>
      </div>
      {/*end of 4th row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          Favorite Artists:
        </div>
        <div className="col-md-4">
          Artist1, Artist2, Artist3, Artist5, Artist6, Artist Seven, Artist Eight
        </div>
      </div>
      {/*end of 5th row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          Favorite Games:
        </div>
        <div className="col-md-4">
          Game1, Game2, Game3, Game4, Game Five, Game Six, Game Seven
        </div>
      </div>
      {/*end of 6th row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          Following:
        </div>
        <div className="col-md-4">
          Username1, Username2, Username3, Username_Four, Username_Five
        </div>
      </div>
      {/*end of 7th row*/}
      <div className="row profile-row">
        <div className="col-md-2 col-md-offset-4">
          Followers:
        </div>
        <div className="col-md-4">
          Username6, Username7, Username8, Username_Nine, Username_Ten
        </div>
      </div>
      {/*end of 8th row*/}
    </div>
    )
  }

}
