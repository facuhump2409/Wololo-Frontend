import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect,useState} from 'react'
import GamesPieChart from "./gamesPieChart";
import {trackPromise} from "react-promise-tracker";
import {GAMES_STATS} from "../../../redux/actionTypes";
import {gamesStats} from "../../../services/admin";
import {connect,useDispatch} from "react-redux";
// import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import { DateRangePicker } from 'rsuite' ;

const mapStateToProps = state => ({ ...state.admin });
const { combine, allowedMaxDays, afterToday } = DateRangePicker;
function UserStats (props){
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState({});
    const toggle = () => setOpen(!open);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: GAMES_STATS, payload: gamesStats() });
    }, [dispatch])

    function onChangeDate(to,from) {
        dispatch({type: GAMES_STATS, payload: gamesStats(from,to)})
    }
    return (
        <div>
            <h3>Games Statistics</h3>
            <DateRangePicker defaultOpen= {true} placeholder="Select Date Range" disabledDate={combine(allowedMaxDays(100),afterToday())}/>
            <GamesPieChart data={props.gamesStats}/>
        </div>
    );
}

export default connect(mapStateToProps, null)(AdminView);
