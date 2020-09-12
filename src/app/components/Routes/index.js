import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
import SignUpComponent from '../signup';
import Games from '../GamesList'
import Header from '../Header'
import ValidatedLoginForm from "../ValidatedLoginForms"

function RoutesContainer() {
  return (
  <Router>
    <div className="App">
    <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
            <AuthenticatedRoute path='/games' component={Games} />
          </Switch>
    </div>
  </Router>
  );
}

export default RoutesContainer;