import React from 'react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../../screens/Home';
import Login from '../../screens/Login';
import Header from '../components/Header';
import Games from '../../screens/Games';
import AuthenticatedRoute from './components/AuthenticatedRoute'

function RoutesContainer() {
  return (
  <Router>
    <Header/>

    <Route exact path='/'>
      <Home />
    </Route>

    <Route exact path='/login'>
      <Login/>
    </Route>

    <AuthenticatedRoute exact path='/games' component={Games}/>
  </Router>
  );
}

export default RoutesContainer;