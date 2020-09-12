import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
<<<<<<< HEAD
import SignUpComponent from '../Login/signup';
import Games from '../games'
import Header from '../Header'
import ValidatedLoginForm from "../Login/validatedLoginForms"
=======
import SignUpComponent from '../signup';
import Games from '../GamesList'
import Header from '../Header'
import ValidatedLoginForm from "../ValidatedLoginForms"
import NewGame from '../newGame'
>>>>>>> origin/create_new_Game

function RoutesContainer() {
  return (
  <Router>
    <div className="App">
    <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
<<<<<<< HEAD
            <Route path="/sign_out" render={()=> (
              <p>Sign Out Succesfully </p>
            )}/>
            <AuthenticatedRoute path='/games' component={Games} />
=======
            <Route path='/games' component={Games} />
            <Route path='/newGame' component={NewGame} />
>>>>>>> origin/create_new_Game
          </Switch>
    </div>
  </Router>
  );
}

export default RoutesContainer;