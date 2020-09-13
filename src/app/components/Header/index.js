import React from 'react';
import { useSelector } from 'react-redux'
import '../../../css/navbar.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { NOT_LOGGED_LINKS, LOGGED_LINKS } from './constants'

function Header() {
  const { isAuthorized } = useSelector(state => state.auth);

  function createNavbar(items) {
    console.log(items)
    return items.map(item => (
        <li className="nav-item">
    <Link className="nav-link" to={item.to}>{item.name}</Link>
        </li>
    ))
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Wololo</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {isAuthorized ? createNavbar(LOGGED_LINKS) : createNavbar(NOT_LOGGED_LINKS)}
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default connect()(Header);