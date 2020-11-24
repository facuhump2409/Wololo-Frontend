import {Link} from "react-router-dom";
import React, {useState} from "react";
import '../../../css/navbar.css'
import { NavItem } from 'reactstrap'
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import AddIcon from '@material-ui/icons/Add';
import GamesIcon from '@material-ui/icons/Games';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
function NavbarItem(props) {
    const [open, setOpen] = useState(false);

    function renderSwitch(to) {
        switch (to) {
            case '/games':
                return <SportsEsportsIcon/>
            case '/newGame':
                return <CreateIcon/>
            case '/sign_out':
                return <ExitToAppIcon/>
        }
    }
    return(
        <NavItem>
            <Link className="nav-link" to={props.item.to}>{ renderSwitch(props.item.to) } {props.item.name}
            </Link>
        </NavItem>
    )
}

export default NavbarItem;