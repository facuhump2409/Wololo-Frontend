import React from 'react';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../../screens/Home';
import Login from '../../screens/Login';
import Header from '../components/Header'

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
    <Route exact path='/sign-in'>
      <Login/>
    </Route>
  </Router>
  );
}

export default RoutesContainer;