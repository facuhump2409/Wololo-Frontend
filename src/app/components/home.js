import React from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {getFromLocal} from "../../services/localStorage";

function Home() {
  const { isAuthorized } = useSelector(state => state.auth)
  const isAdmin = getFromLocal('isAdmin')
  return <Redirect to={ isAuthorized ? (isAdmin ? '/admin' : '/games') : '/sign_in' }/>;
};

export default Home;