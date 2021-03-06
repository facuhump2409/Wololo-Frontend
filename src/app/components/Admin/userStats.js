import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect,useState} from 'react'
import GamesPieChart from "./gamesPieChart";
import { GET_USERS, USER_STATS} from "../../../redux/actionTypes";
import {userStats} from "../../../services/admin";
import {connect,useDispatch} from "react-redux";
import {getUsers} from "../../../services/users";
import UserModal from "./userModal";
import PieChart from "./pieChart";
import SearchBar from "./searchBar";

const mapStateToProps = state => {
    return {
        users: state.users.users,
        admin: state.admin,
        selectedUser: state.admin.selectedUser
    }
};

function UserStats (props){
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: GET_USERS, payload: getUsers});
    }, [dispatch])

    // function onChangeUser(username) {
    //     dispatch({type: USER_STATS, payload: userStats(username)})
    // }
    return (
        <div>
            <h3 align="center">Users Stats</h3>
            <SearchBar users={props.users}/>
            <UserModal users={props.users} display={open} onClose={() => setOpen(false)}/>
            <PieChart selectedUser={props.selectedUser}/>
        </div>
    );
}

export default connect(mapStateToProps, null)(UserStats);
