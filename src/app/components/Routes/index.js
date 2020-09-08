import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from '../home';
import SignUpComponent from '../signup';
import Login from "../login"
import Header from '../Header'
import ValidatedLoginForm from "../ValidatedLoginForms"

function RoutesContainer() {
  return (
  <Router>
    <div className="App">
    <Header/>
    <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={ValidatedLoginForm} />
            <Route path="/sign-up" component={SignUpComponent} />
          </Switch>
        </div>
    </div>

    </div>
  </Router>
  );
}

export default RoutesContainer;