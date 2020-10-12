import React, { useState, useEffect, useCallback } from 'react'
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const AdminView = (props) => {
    return (
        <div>
            <Admin dataProvider={dataProvider} history={history}/>
        </div>
    )
}

export default AdminView;
