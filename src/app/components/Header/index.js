import React from 'react';
import '../../../css/navbar.css'
import { Link } from "react-router-dom";

function Header() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to={"/sign_in"}>Wololo</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign_in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign_up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link
                    className="nav-link" to={"/sing_out"}
                    // style={{display: !metodoParaAgarrarVariableDeRedux && "none"}}
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Header;