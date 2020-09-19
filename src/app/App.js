import React from 'react';
import {Provider,connect} from 'react-redux';
import Routes from './components/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css'
import {store} from '../redux/store'
import {push} from "react-router-redux";
import {REDIRECT} from "../redux/actionTypes";


function App(props) {
  return (
    <Provider store={props.store}>
      <Routes/>
    </Provider>
  );
}

export default App;
