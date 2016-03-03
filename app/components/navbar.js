import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">
            <span><img src="img/logo-xsmall.png" alt="BBQ Forte Logo" /></span> BBQ Forte
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <div className="nav navbar-nav navbar-left">

            </div>

            <ul className="nav navbar-nav navbar-right">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default message-button navbar-btn">
                  <span className="glyphicon glyphicon-envelope"></span>
                </button>
                <button type="button" className="btn btn-default dropdown-toggle navbar-btn" data-toggle="dropdown">
                  Hello, Username! <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><Link to={"/profile/" + "TEST_NAME"}>Profile</Link></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Log out</a></li>
              </ul>
            </div>
          </ul>

          <form className="navbar-form" role="search">
            <div className="form-group">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search BBQ Forte" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-search"></span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}
