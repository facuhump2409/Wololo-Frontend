import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect, useState} from 'react'
import GamesPieChart from "./gamesPieChart";
import {GAMES_STATS} from "../../../redux/actionTypes";
import {gamesStats} from "../../../services/admin";
import {connect, useDispatch} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const mapStateToProps = state => ({...state.admin});
const {combine, allowedMaxDays, afterToday, allowedDays} = DatePicker;

function AdminView(props) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        dispatch({type: GAMES_STATS, payload: gamesStats(start, end)})
    };


    useEffect(() => {
        dispatch({type: GAMES_STATS, payload: gamesStats()});
    }, [dispatch])


    return (
        <div>

            <h3>Games Statistics</h3>
            <div>
                <DatePicker    selected={startDate}
                               onChange={onChange}
                               startDate={startDate}
                               endDate={endDate}
                               selectsRange
                               inline
                               />
            </div>
            <GamesPieChart data={props.gamesStats}/>

        </div>


    )
        ;
}

export default connect(mapStateToProps, null)(AdminView);
