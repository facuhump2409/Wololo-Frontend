import React from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const { isAuthorized } = useSelector(state => state.auth)

  return <Redirect to={ isAuthorized ? '/games' : '/sign_in' }/>;
};

export default Home;