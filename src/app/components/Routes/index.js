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
import {Redirect} from "react-router-dom";
import {LOGOUT, REDIRECT} from "../../../redux/actionTypes";
import { store } from '../../../redux/store';
import {push} from "react-router-redux";
import {signOut} from "../../../services/auth";

const mapStateToProps = state => {
  return {
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
      dispatch({ type: REDIRECT }),
  onSignOut: () =>
      dispatch({type: LOGOUT, payload: signOut()})
});

function RoutesContainer(props) {
  const { isAuthorized } = useSelector(state => state.auth);

  function handleSignOut(){
    props.onSignOut()
  }

  function componentDidUpdate(prevProps) {
    console.log("Props que estan updateadas",prevProps.redirectTo)
    if (props.redirectTo) {
      store.dispatch(push(props.redirectTo));
      this.props.onRedirect();
    }
  }
  return (
  <Router>
    <div className="App">
    <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign_in" component={ValidatedLoginForm} />
            <Route path="/sign_up" component={SignUpComponent} />
            <Route key="sign-out-button" path="/sign_out" render={handleSignOut}/>
            <AuthenticatedRoute path='/games' component={Games} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/newGame' component={NewGame} isAuthenticated={isAuthorized} />
            <AuthenticatedRoute path='/game/:id' component={Game} isAuthenticated={isAuthorized} />
          </Switch>
    </div>
  </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);