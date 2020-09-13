import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
import SignUpComponent from '../Login/signup';
import Games from '../GamesList'
import Header from '../Header'
import ValidatedLoginForm from "../Login/validatedLoginForms"
import SignOut from "../Login/signOut"
import NewGame from '../newGame'

function RoutesContainer() {
  return (
  <Router>
    <div className="App">
    <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
            <Route path="/sign_out" component={SignOut}/>
            <Route path='/games' component={Games} />
            <Route path='/newGame' component={NewGame} />
          </Switch>
    </div>
  </Router>
  );
}

export default RoutesContainer;