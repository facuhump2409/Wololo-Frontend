import 'rsuite/dist/styles/rsuite-default.css';
import React, {useEffect, useState} from 'react'
import {CONFIGURATION_UPDATE, GET_CONFIGURATION, SHOWED_MESSAGE} from "../../../redux/actionTypes";
import {gamesConfiguration, gamesStats, updateConfiguration} from "../../../services/admin";
import {connect, useDispatch} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import LoadingIndicator from "../../loadingIndicator";
import ActionResult from "../Game/components/TownActions/actionResult";
import GameModeSelect from "../gameMode";
import HelpBlock from "rsuite";
import { Form, FormGroup, FormControl } from 'rsuite';
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import * as Yup from "yup";
import ErrorMessage from "../errorMessage";
import GoogleBtn from "../Login/GoogleBtn";
import HorizontalLabelPositionBelowStepper from "../stepper";
import {StepButton} from "../stepButton";


const mapStateToProps = state => ({...state.admin});

function GamesVariables(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const onUpdate = configuration => {
        dispatch({type: CONFIGURATION_UPDATE, payload: updateConfiguration(configuration)})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch({type: GET_CONFIGURATION, payload: gamesConfiguration()});
    }, [dispatch])

    const onMessageShow = () => {
        dispatch({type: SHOWED_MESSAGE})
    }

    this.renderGameMode = function (values, errors, touched, setFieldValue, handleChange) {
        switch (values.gameMode) {
            case 'Easy':
                return <div className="form-group">
                    <label>Email address</label>
                    <input
                        name="mail"
                        type="number"
                        className="form-control"
                        placeholder="Select"
                        value={values.email}
                        onChange={handleChange}
                        // className={errors.email && touched.email && "error"}
                    />
                </div>
            case 'Normal':

            case 'Hard':

        }
        return (
            // <div>
            //     <h3 align="center">Playability Variables</h3>
            //         <Form>
            //             <FormGroup>
            //                 <GameModeSelect align="left"/>
            //                 {/*<HelpBlock tooltip>Minutes of inactivity until an email is send to the user</HelpBlock>*/}
            //             </FormGroup>
            //             <FormGroup>
            //                 <FormControl placeholder="Minutes to send email" />
            //                 {/*<HelpBlock tooltip>Minutes of inactivity until an email is send to the user</HelpBlock>*/}
            //             </FormGroup>
            //
            //             <FormGroup>
            //                 <FormControl name="gauchosMultiplicatorProduction" placeholder="Gauchos Multiplicator production mode" />
            //                 {/*<HelpBlock tooltip>Gauchos Multiplicator in production mode to calculate the games's playability</HelpBlock>*/}
            //             </FormGroup>
            //             <FormGroup>
            //                 <FormControl name="gauchosMultiplicatorDefense" placeholder="Gauchos Multiplicator defense mode" />
            //                 {/*<HelpBlock tooltip>Gauchos Multiplicator in defense mode to calculate the games's playability</HelpBlock>*/}
            //             </FormGroup>
            //             <FormGroup>
            //                 <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title="Add">
            //                     <FormControl name="defenseMultiplicatorProduction" placeholder="Defense Multiplicator production mode" />
            //                 </Tooltip>
            //                 {/*<HelpBlock tooltip>Defense Multiplicator in production mode to calculate the games's playability</HelpBlock>*/}
            //             </FormGroup>
            //             <FormGroup>
            //                 <FormControl name="defenseMultiplicatorDefense" placeholder="Defense Multiplicator defense mode" />
            //                 {/*<HelpBlock tooltip>Defense Multiplicator in defense mode to calculate the games's playability</HelpBlock>*/}
            //             </FormGroup>
            //             <Button onClick={(configurations) => onUpdate(configurations)}>Save</Button>
            //         </Form>
            // </div>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Formik
                        initialValues={{
                            gameMode: "Easy",
                            minutesToSendMail: props.minutesToSendMail,
                            multDefenseForProductionEasyMode: props.configuration.multDefenseForProductionEasyMode,
                            multGauchosForProductionEasyMode: props.configuration.multGauchosForProductionEasyMode,
                            multDefenseForDefenseEasyMode: props.configuration.multDefenseForDefenseEasyMode,
                            multGauchosForDefenseEasyMode: props.configuration.multGauchosForDefenseEasyMode,
                            multDefenseForProductionNormalMode: props.configuration.multDefenseForProductionNormalMode,
                            multGauchosForProductionNormalMode: props.configuration.multGauchosForProductionNormalMode,
                            multDefenseForDefenseNormalMode: props.configuration.multDefenseForDefenseNormalMode,
                            multGauchosForDefenseNormalMode: props.configuration.multGauchosForDefenseNormalMode,
                            multDefenseForProductionHardMode: props.configuration.multDefenseForProductionHardMode,
                            multGauchosForProductionHardMode: props.configuration.multGauchosForProductionHardMode,
                            multDefenseForDefenseHardMode: props.configuration.multDefenseForDefenseHardMode,
                            multGauchosForDefenseHardMode: props.configuration.multGauchosForDefenseHardMode
                        }}
                        onSubmit={(values) => {
                            onUpdate(values)
                        }}
                        // validationSchema = {Yup.object().shape({
                        //     mail: Yup.string()
                        //         .required("Please enter a valid email"),
                        //     password: Yup.string()
                        //         .required("Enter a password")
                        //     // .min(8,"Password is too short - should be 8 characters minimum")
                        //     // .matches(/(?=.*[0-9])/,"Password must contain at least a number")
                        // })
                        //
                        // }>
                    >
                        {({
                              values, errors, touched,
                              setFieldValue, handleChange
                          }) => (
                            <Form>
                                <h3>Playability Variables</h3>
                                <input
                                    name="mail"
                                    type="number"
                                    className="form-control"
                                    placeholder="Minutes to send mail"
                                    value={values.min}
                                    onChange={handleChange}
                                    // className={errors.email && touched.email && "error"}
                                />
                                <GameModeSelect align="left" onChange={(e, val) => setFieldValue("gameMode", val)}/>
                                {this.renderGameMode(values, errors, touched, setFieldValue)}
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block">
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {props.inProgress ? <LoadingIndicator display={true}/> : props.showFinishMessage ?
                        <ActionResult onClose={onMessageShow()} message="Settings changed succesfully"/> : ""}
                </div>
            </div>


        )
    }
}

export default connect(mapStateToProps, null)(GamesVariables);
