import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getUsers} from '../../services/users';
import {createGame, getProvinces} from '../../services/games';
import {CREATE_GAME, GET_PROVINCES, GET_USERS, REDIRECT_GAME} from '../../redux/actionTypes';
import Argentina from '../../svg/argentina';
import {RadioSVGMap} from "react-svg-map/src/";
import LoadingIndicator from "../loadingIndicator"
import ErrorMessage from "./errorMessage";
import SweetAlert from "react-bootstrap-sweetalert";
import {StepGame, StepsNewGame} from "./stepsNewGame";
import Box from "@material-ui/core/Box";
import {TextField} from "formik-material-ui";
import {object} from "yup";
import {CardContent, Slider} from "@material-ui/core";
import DiscreteSlider from "./slider";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: 4,
        label: '4',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 14,
        label: '14',
    },
    {
        value: 20,
        label: '20',
    },
];

const BOOTSTRAP_CLASSES = {
    filter: 'form-control',
    select: 'form-control',
    button: 'btn btn btn-block btn-default',
    buttonActive: 'btn btn btn-block btn-primary',
}


const mapStateToProps = state => {
    return {
        users: state.users.users,
        errors: state.users.errors,
        inProgress: state.games.inProgress,
        finishedCreation: state.games.finishedCreation,
        gamesErrors: state.games.errors,
        provinces: state.provinces.provinces
    }
};

const mapDispatchToProps = dispatch => ({
    getParticipants: () => dispatch({type: GET_USERS, payload: getUsers}),
    createGame: (gameData) => dispatch({type: CREATE_GAME, payload: createGame(gameData)}),
    getStates: () => dispatch({type: GET_PROVINCES, payload: getProvinces}),
    redirectGame: () => dispatch({type: REDIRECT_GAME})
})

class NewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUsers: [],
            pointedLocation: null,
            focusedLocation: null,
            selectedLocation: null,
            towns: 0
        }

        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
        this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
        this.handleLocationFocus = this.handleLocationFocus.bind(this);
        this.handleLocationBlur = this.handleLocationBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        this.handleTownChange = this.handleTownChange.bind(this);
    }

    renderStep = (step, values, errors, touched) => {
        switch (step) {
            case 1:
                return <FormFirstStep errors={errors} touched={touched} />;
            case 2:
                return <FormSecondStep errors={errors} touched={touched} />;
            case 3:
                return <FormSuccess values={values} />;
            default:
                return <FormFirstStep errors={errors} touched={touched} />;
        }
    };

    getLocationName(event) {
        return event.target.attributes.name.value;
    }

    handleLocationMouseOver(event) {
        const pointedLocation = this.getLocationName(event);
        this.setState({pointedLocation: pointedLocation});
    }

    handleLocationMouseOut() {
        this.setState({pointedLocation: null});
    }

    handleLocationFocus(event) {
        const focusedLocation = this.getLocationName(event);
        this.setState({focusedLocation: focusedLocation});
    }

    handleLocationBlur() {
        this.setState({focusedLocation: null});
    }

    handleOnChange(selectedNode) {
        this.setState(prevState => {
            return {
                ...prevState,
                selectedLocation: selectedNode.attributes.name.value
            };
        });
    }

    componentDidMount() {
        this.props.getParticipants();
        this.props.getStates();
    }

    getInitialState() {
        return {
            value: 'select'
        }
    };

    users() {
        return !this.props.errors ? this.props.users.map((user) => ({value: user.id, text: user.username})) : []
    }

    provinces() {
        return !this.props.errors ? this.props.provinces : []
    }

    handleSelectionChange(selectedUsers) {
        this.setState({selectedUsers: selectedUsers});
    }

    handleDeselect(index) {
        const selectedUsers = this.state.selectedUsers.slice();
        selectedUsers.splice(index, 1)
        this.setState({selectedUsers: selectedUsers})
    }


    validateForm() {
        const provinces = this.provinces();
        return provinces.includes(this.state.selectedLocation)
        // if (provinces.includes(this.state.selectedLocation)) {
        //     console.log(this.state.selectedLocation + "Included")
        //     return true
        // } else {
        //     return false
        // }

    }

    onGameCreated() {
        return this.props.finishedCreation ? this.props.redirectGame() : null
    }

    render() {
        function valuetext(value) {
            // props.setformValues(value)
            return `${value} towns`;
        }
        // const classes = useStyles();
        const selectedUsers = this.state.selectedUsers;
        // const validator= Yup.object().shape({
        //     // selectProvince: Yup.string()
        //     //     .required("Please select a state"),
        //     towns: Yup.number().required("Please enter the number of towns")

        // })
        const validate = values => {
            const errors = {};
            if (!values.selectProvince) {
                errors.selectProvince = "Required";
            }

            if (values.towns === 0) {
                errors.towns = "Please select at least two towns";
            }

            return errors;
        };

        return (
            <Card>
                <CardContent>
                    <label>Create New Game</label>

                    <Formik
                        // innerRef={ref}
                        initialValues={{selectProvince: "", towns: "",selectedUsers: ""}}
                        validate={validate}
                        // validationSchema = {validator}
                        onSubmit={(values) => {
                            console.log("state:",this.state)
                            this.props.createGame({
                                provinceName: values.selectProvince,//this.state.selectedLocation,
                                townAmount: parseInt(values.towns),
                                participantsIds: values.selectedUsers.map(user => user.value),//this.state.selectedUsers.map(user => user.value),
                            })
                                .setSubmitting(false);
                        }}
                        >
                    {/*render={({*/}
                    {/*             values,*/}
                    {/*             errors,*/}
                    {/*             handleSubmit,*/}
                    {/*             handleChange,*/}
                    {/*             isSubmitting,*/}
                    {/*             setFieldValue*/}
                    {/*         }) => (*/}
                    <form>
                        <article className="examples__block" width="300px">
                            <h2 className="examples__block__title">
                                Select province
                            </h2>
                            <div className="examples__block__info">
                                <div className="examples__block__info__item">
                                    Selected Province: {this.state.selectedLocation}
                                </div>
                            </div>
                            <div style={{width: "250px"}}>
                                <RadioSVGMap
                                    name="selectProvince"
                                    map={Argentina}
                                    onLocationMouseOver={this.handleLocationMouseOver}
                                    onLocationMouseOut={this.handleLocationMouseOut}
                                    onLocationFocus={this.handleLocationFocus}
                                    onLocationBlur={this.handleLocationBlur}
                                    onChange={this.handleOnChange}
                                />

                            </div>
                        </article>
                        <StepGame
                            validationSchema={object({
                                towns: Yup.number().required("Please enter the number of towns")
                            })}>
                            <Box paddingBottom={2}>
                                {/*<div className={useStyles().root}>*/}
                                    <Typography id="discrete-slider-always" gutterBottom>
                                        Amount of towns
                                    </Typography>
                                    <Slider
                                        id="towns"
                                        name="towns"
                                        defaultValue={someFuncton()}
                                        getAriaValueText={valuetext}
                                        max={20}
                                        aria-labelledby="discrete-slider-custom"
                                        step={2}
                                        marks={marks}
                                        // onChange={this.handleTownChange}
                                        valueLabelDisplay="auto"
                                    />
                                {/*</div>*/}
                                {/*<Field*/}
                                {/*    // fullWidth*/}
                                {/*    name="towns"*/}
                                {/*    type="slider"*/}
                                {/*    component={DiscreteSlider}*/}
                                {/*    placeholder="Number of towns"*/}
                                {/*/>*/}
                            </Box>
                        </StepGame>
                        {/*<div className="form-group">*/}
                        {/*    <input*/}
                        {/*        name="towns"*/}
                        {/*        // className="form-control"*/}
                        {/*        type="number"*/}
                        {/*        onChange={this.handleTownsChange}*/}
                        {/*        placeholder="Number of towns"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <label>Select Users</label>

                        <div>
                            <FilteredMultiSelect
                                name="users"
                                classNames={BOOTSTRAP_CLASSES}
                                onChange={this.handleSelectionChange}
                                options={this.users()}
                                selectedOptions={selectedUsers}
                            />


                            {selectedUsers.length === 0 && <p>(nothing selected yet)</p>}
                            {selectedUsers.length > 0 && <ul>
                                {selectedUsers.map((user, i) => <li key={user.id}>
                                    {`${user.text} `}

                                    <button type="button"
                                            onClick={() => this.handleDeselect(i)}>
                                        &times;
                                    </button>
                                </li>)}
                            </ul>}
                        </div>


                    </form>

                {/*)}*/}

                        {/*<button*/}
                        {/*    className="btn btn-lg pull-xs-right btn-primary"*/}
                        {/*    onClick={() => this.validateForm()}*/}
                        {/*    type="submit"*/}
                        {/*>*/}
                        {/*    Create New Game*/}
                        {/*</button>*/}
                    </Formik>
                    <LoadingIndicator display={this.props.inProgress}/>
                    <ErrorMessage errors={this.props.gamesErrors}/>
                    <SweetAlert
                        success
                        title="Game Created Succesfully!"
                        onConfirm={() => this.onGameCreated()}
                        onCancel={() => this.onGameCreated()}
                        timeout={2000}
                        show={this.props.finishedCreation}
                    >
                        Redirecting to all your games
                    </SweetAlert>
                </CardContent>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
