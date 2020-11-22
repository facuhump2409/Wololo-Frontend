import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import '../../../css/navbar.css'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {NOT_LOGGED_LINKS, LOGGED_LINKS, ADMIN_LINKS} from './constants'
import NavbarItem from "./navbarItem";
import {getFromLocal} from "../../../services/localStorage";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap'
import userImg from '../../assets/user.png'

function Header(props) {
  const isAuthorized = useSelector(state => state.auth.isAuthorized);
  const currentUser = getFromLocal('currentUser');
  function createNavbar(items) {
    return items.map(item => (
        <NavbarItem item={item} key={item.id}/>
    ))
  }  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
      <Navbar color='light' light expand='lg'>
              <NavbarBrand>
                  <Link className="navbar-brand text" to={"/"}>Wololo</Link>
              </NavbarBrand>
              <NavbarToggler onClick={toggle} className='mr-2'><span class="navbar-toggler-icon"></span></NavbarToggler>
              <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                      {isAuthorized ? getFromLocal('isAdmin') ? createNavbar(ADMIN_LINKS) : createNavbar(LOGGED_LINKS) : createNavbar(NOT_LOGGED_LINKS)}
                      {currentUser && (
                      <NavItem className='inner-container'>
                        <img src={userImg} alt='user' className='img-user'></img>
                        <NavbarText style={{
                          fontWeight: 'bold',
                        }}>{currentUser.username} </NavbarText>
                      </NavItem>
                      )
                      }
              </Nav>
              </Collapse>
      </Navbar>
  );
}

export default connect()(Header);