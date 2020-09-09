import React from 'react';
import '../../../css/navbar.css'
import { Link } from "react-router-dom";

function Header() {
  // if metodoQueTraeVariable
  let navItems
  if (true) {
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
                  <Link className="nav-link" to={"/sing_out"}>
                    Sign out
                  </Link>
                </li>
              </ul>

  }
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={"/sign_in"}>Wololo</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {navItems}
          </div>
        </div>
      </nav>
  );
}

export default Header;