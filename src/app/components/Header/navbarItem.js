import {Link} from "react-router-dom";
import React, {useState} from "react";
import '../../../css/navbar.css'
import { NavItem } from 'reactstrap'

function NavbarItem(props) {
    const [open, setOpen] = useState(false);
    return(
        <NavItem>
            <Link className="nav-link" to={props.item.to}>{props.item.name}</Link>
        </NavItem>
    )
}

export default NavbarItem;