import React from 'react';

import { Redirect, Route } from 'react-router-dom';

function AuthenticatedRoute({
  isAuthenticated = true,
  component: Component,
  ...restOfProps
  }) {
  return (
    <Route {...restOfProps} render={(props) => (
      isAuthenticated ? <Component {...props} /> : <Redirect to='/sign_in' />
    )}/>
  )
}

export default AuthenticatedRoute;
