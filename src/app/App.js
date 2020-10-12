import React from 'react';
import {Provider,connect} from 'react-redux';
import Routes from './components/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css'
import { store} from '../redux/store'

function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
