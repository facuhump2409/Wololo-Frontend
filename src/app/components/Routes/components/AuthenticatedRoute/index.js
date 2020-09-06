import React from 'react';

import { Redirect, Route } from 'react-router-dom';

function AuthenticatedRoute({
  isAuthenticated = false,
  component: Component,
  ...restOfProps
  }) {
  return (
    <Route {...restOfProps} render={(props) => (
      isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
    )}/>
  )
}

export default AuthenticatedRoute;
