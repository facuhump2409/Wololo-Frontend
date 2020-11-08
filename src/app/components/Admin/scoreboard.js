import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect,useState} from 'react'
import { GET_USERS, USER_STATS} from "../../../redux/actionTypes";
import {connect,useDispatch} from "react-redux";
import {getUsers} from "../../../services/users";
import Table from "react-bootstrap/Table";
import "./styles/scoreboard.css"
import {users} from "./constants";

const mapStateToProps = state => {
    return {
        users: state.users.users,
    }
};

function Scoreboard (props){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: GET_USERS, payload: getUsers});
    }, [dispatch])

    const [topPlayers, setTopPlayers] = useState(users);
    console.log("SCOREBOARD")
    return (
        <Table striped bordered condensed hover className="rankingTable">
            <thead>
                <tr>
                    <th className="rankingRow">Rank</th>
                    <th className="rankingRow">User Name</th>
                    <th className="rankingRow">Points</th>
                </tr>
            </thead>
            <tbody>
            {topPlayers.map((row, index) => (
                <tr key={row.username}>
                    <td>{index + 1}</td>
                    <td>{row.username}</td>
                    <td>{row.score}</td>
                </tr>
            )
            )}
            </tbody>
        </Table>
    );
}

export default connect(mapStateToProps, null)(Scoreboard);
