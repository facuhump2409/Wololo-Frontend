import {Link} from "react-router-dom";
import React from "react";
import '../../../css/navbar.css'

function NavbarItem(props) {
    const [open, setOpen] = useState(false);
    return(
        <li className="nav-item" key={props.item.id}>
            <Link className="nav-link" to={props.item.to}>{props.item.name}</Link>
        </li>
    )
}

export default NavbarItem;