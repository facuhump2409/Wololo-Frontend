import {Link} from "react-router-dom";
import React, {useState} from "react";
import '../../../css/navbar.css'

function NavbarItem(props) {
    const [open, setOpen] = useState(false);
    return(
        <li className="nav-item">
            <Link className="nav-link" to={props.item.to}>{props.item.name}</Link>
        </li>
    )
}

export default NavbarItem;