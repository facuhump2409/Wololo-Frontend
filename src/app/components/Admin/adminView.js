import React, { useState, useEffect, useCallback } from 'react'
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import NotFound from './notFound'

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const AdminView = (props) => {
    return (
        <div>
            <Admin dataProvider={dataProvider} catchAll={NotFound}/>
        </div>
    )
}

export default AdminView;
