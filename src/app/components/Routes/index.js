import React from 'react';

import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
import SignUpComponent from '../Login/signup';
import Games from '../GamesList'
import Header from '../Header'
import ValidatedLoginForm from "../Login/validatedLoginForms"
import SignOut from "../Login/signOut"
import NewGame from '../newGame'
import Game from '../Game';

function RoutesContainer() {
  const { isAuthorized } = useSelector(state => state.auth);

  return (
  <Router>
    <div className="App">
    <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
            <Route path="/sign_out" component={SignOut}/>
            <AuthenticatedRoute path='/games' component={Games} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/newGame' component={NewGame} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/game/:id' component={Game} isAuthenticated={isAuthorized} />
          </Switch>
    </div>
  </Router>
  );
}

export default RoutesContainer;