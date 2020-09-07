import React from 'react';
import { Link } from 'react-router-dom';

import '../../../../css/navbar.css'

function Header() {
  return (
  <div className="navbar">
  <Link to='/' >Home</Link>
  <Link to='/login'>Login</Link>
  <Link to='/sign-in'>Sign In</Link>
  </div>
  );
}

export default Header;