import React from 'react';
import {Link} from 'react-router';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="col-md-2 sidebar-separator">
        <ul className="nav nav-pills nav-stacked sidebar-text">
          <li role="presentation">
            <Link to={"/profile/" + "TEST_NAME"}>Username</Link>
          </li>
          <li role="presentation">
            <span className="glyphicon glyphicon-th-list"></span> BROWSE PLAYLISTS
          </li>
          <li role="presentation">
            <Link to={"/saved-playlist/" + "TEST"}>Your Saved Playlists</Link>
          </li>
          <li role="presentation">
            <Link to={"/new-releases/" + "TEST"}>New Releases</Link>
          </li>
          <li role="presentation">
            <Link to={"/most-popular/" + "TEST"}>Most Popular</Link>
          </li>
          <li role="presentation">
            <Link to={"/highest-rated/" + "TEST"}>Highest Rated</Link>
          </li>
          <li role="presentation">
            <Link to={"/rising-playlists/" + "TEST"}>Rising</Link>
          </li>
          <li role="presentation">
            <Link to={"/saved-playlist/" + "TEST"}>Browse All Playlists...</Link>
          </li>
          <li role="presentation"><span className="glyphicon glyphicon-comment"></span> SOCIAL</li>
          <li role="presentation">
            <Link to={"/forum/" + "TEST"}>Forum</Link>
          </li>
          <li role="presentation">
            <Link to ={"/private-chat/" + "TEST"}>Private Chat <span className="badge badge-style pull-right">2</span></Link>
          </li>
          <li role="presentation"><span className="glyphicon glyphicon-th-large"></span> MISCELLANEOUS</li>
          <li role="presentation">
            <Link to={"/about-us/" + "TEST"}>About Us</Link>
          </li>
          <li role="presentation">
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    )
  }
}
