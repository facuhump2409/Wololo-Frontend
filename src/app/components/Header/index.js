import React from 'react';
import { useSelector } from 'react-redux'
import '../../../css/navbar.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {NOT_LOGGED_LINKS, LOGGED_LINKS, ADMIN_LINKS} from './constants'
import NavbarItem from "./navbarItem";
import {getFromLocal} from "../../../services/localStorage";

function Header(props) {
  const isAuthorized = useSelector(state => state.auth.isAuthorized);
  function createNavbar(items) {
    return items.map(item => (
        <NavbarItem item={item} key={item.id}/>
    ))
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
              <Link className="navbar-brand" to={"/"}>Wololo</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                      {isAuthorized ? getFromLocal('isAdmin') ? createNavbar(ADMIN_LINKS) : createNavbar(LOGGED_LINKS) : createNavbar(NOT_LOGGED_LINKS)}
                  </ul>
              </div>
          </div>
      </nav>
  );
}

export default connect()(Header);