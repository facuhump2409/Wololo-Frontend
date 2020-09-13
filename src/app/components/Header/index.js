import React from 'react';
import '../../../css/navbar.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {activeAuthorization} from "../../../redux/reducers/auth";

function Header(authorization) {
  let navItems
  if (!authorization.isAuthorized) {
    navItems = <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign_in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign_up"}>Sign up</Link>
                </li>
              </ul>
  }
  else{
    navItems = <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign_out"}>Sign out</Link>
                </li>
              </ul>

  }
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Wololo</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {navItems}
          </div>
        </div>
      </nav>
  );
}
function mapStateToProps(state) {
    return {
        isAuthorized: activeAuthorization(state)
    }
}

export default connect(mapStateToProps)(Header);