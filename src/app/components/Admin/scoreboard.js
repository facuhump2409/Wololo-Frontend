import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect,useState} from 'react'
import {GET_SCOREBOARD, GET_USERS, USER_STATS} from "../../../redux/actionTypes";
import {connect,useDispatch} from "react-redux";
import {getUsers} from "../../../services/users";
import Table from "react-bootstrap/Table";
import "./styles/scoreboard.css"
import {users} from "./constants";
import {scoreBoard} from "../../../services/admin";
import LoadingIndicator from "../../loadingIndicator";

const mapStateToProps = state => {
    return {
        topPlayers: state.admin.topPlayers,
    }
};

function Scoreboard (props){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: GET_SCOREBOARD , payload: scoreBoard()});
    }, [dispatch])

    // const [topPlayers, setTopPlayers] = useState(users);
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
            {console.log("TOP PLAYERS: ",props.topPlayers)}
            { props.topPlayers ? props.topPlayers.map((row, index) => (
                    <tr key={row.username}>
                        <td>{index + 1}</td>
                        <td>{row.username}</td>
                        <td>{row.stats.gamesWon * 100 - row.stats.gamesLost * 10}</td>
                    {/*    Revisar si les parece bien esta manera de hacer el score  */}
                    </tr>
                )
            ) : <LoadingIndicator display={props.topPlayers === undefined}/> }
            {/*{props.topPlayers.map((row, index) => (*/}
            {/*    <tr key={row.username}>*/}
            {/*        <td>{index + 1}</td>*/}
            {/*        <td>{row.username}</td>*/}
            {/*        <td>{row.score}</td>*/}
            {/*    </tr>*/}
            {/*)*/}
            {/*)}*/}
            </tbody>
        </Table>
    );
}

export default connect(mapStateToProps, null)(Scoreboard);
