import React from 'react';
import {Provider,connect} from 'react-redux';
import Routes from './components/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css'
import {history, store} from '../redux/store'
import AdminView from "./components/Admin/adminView";
import jsonServerProvider from "ra-data-json-server";
import {Admin} from "react-admin";
import NotFound from "./components/Admin/notFound";
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Provider store={store}>
        <Admin
            dataProvider={dataProvider}
            history={history}
            title="Wololo Admin"
            catchAll={NotFound}
        >

        </Admin>
      <Routes/>
    </Provider>
  );
}

export default App;
