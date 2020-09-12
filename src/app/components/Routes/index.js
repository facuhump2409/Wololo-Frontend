import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
import SignUpComponent from '../Login/signup';
import Games from '../games'
import Header from '../Header'
import ValidatedLoginForm from "../Login/validatedLoginForms"

function RoutesContainer() {
  return (
  <Router>
    <div className="App">
    <Header/>
    <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
            <Route path="/sign_out" render={()=> (
              <p>Sign Out Succesfully </p>
            )}/>
            <AuthenticatedRoute path='/games' component={Games} />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default RoutesContainer;