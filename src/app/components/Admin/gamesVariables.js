import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect, useState} from 'react'
import GamesPieChart from "./gamesPieChart";
import {CONFIGURATION_UPDATE, GET_CONFIGURATION, SHOWED_MESSAGE} from "../../../redux/actionTypes";
import {gamesConfiguration, gamesStats, updateConfiguration} from "../../../services/admin";
import {connect, useDispatch} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingIndicator from "../../loadingIndicator";
import ActionResult from "../Game/components/TownActions/actionResult";
import GameModeSelect from "../gameMode";
import FormControl, {FormGroup} from "rsuite";
import HelpBlock from "rsuite";


const mapStateToProps = state => ({...state.admin});

function GamesVariables(props) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onUpdate = configuration => {
        dispatch({type: CONFIGURATION_UPDATE, payload: updateConfiguration(configuration)})
    };


    useEffect(() => {
        dispatch({type: GET_CONFIGURATION, payload: gamesConfiguration()});
    }, [dispatch])

    const onMessageShow = () => {
        dispatch({type: SHOWED_MESSAGE})
    }

    return (
        <div>

            <div className="box">
                <h3 align="center">Games Statistics</h3>
                <h5>Configuration</h5>
                <div>
                    <Form>
                        <FormGroup>
                            <GameModeSelect/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl name="email" placeholder="Email" />
                            <HelpBlock>This field is required</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <FormControl name="name" placeholder="Name" />
                            <HelpBlock tooltip>This field is required</HelpBlock>
                        </FormGroup>
                    </Form>
                </div>
            </div>
                {props.inProgress ? <LoadingIndicator display={true}/> : props.showFinishMessage ?
                    <ActionResult onClose={onMessageShow()} message="Settings changed succesfully"/> : ""}
        </div>


    )
        ;
}

export default connect(mapStateToProps, null)(GamesVariables);
