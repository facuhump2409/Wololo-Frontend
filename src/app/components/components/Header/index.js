import React from 'react';
import { Link } from 'react-router-dom';

import '../../../../css/navbar.css'

function Header() {
  return (
  <div className="navbar">
  <Link to='/' >Go to Home</Link>
  <Link to='/login'>Login</Link>
  </div>
  );
}

export default Header;