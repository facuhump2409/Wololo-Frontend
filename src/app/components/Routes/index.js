import React from 'react';

import {connect, useSelector} from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
import SignUpComponent from '../Login/signup';
import Games from '../GamesList'
import Header from '../Header'
import ValidatedLoginForm from "../Login/validatedLoginForms"
import NewGame from '../newGame'
import Game from '../Game';
import {signOutUser} from "../../../redux/actions";
import {Redirect} from "react-router-dom";

function RoutesContainer(props) {
  const { isAuthorized } = useSelector(state => state.auth);

  function handleLogout() {
    props.signOutUser()
    // props.history.push(`/`)
    return <Redirect to="/"/>
  }

  return (
  <Router>
    <div className="App">
    <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
            <Route key="sign-out-button" path="/sign_out" render={handleLogout}/>
            <AuthenticatedRoute path='/games' component={Games} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/newGame' component={NewGame} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/game/:id' component={Game} isAuthenticated={isAuthorized} />
          </Switch>
    </div>
  </Router>
  );
}

export default connect(null, { signOutUser })(RoutesContainer);