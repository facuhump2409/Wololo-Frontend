import React from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'
import {Form, Formik} from "formik";
import {getUsers} from '../../services/users';
import {createGame, getProvinces} from '../../services/games';
import {CREATE_GAME, GET_PROVINCES, GET_USERS, REDIRECT_GAME} from '../../redux/actionTypes';
import Argentina from '../../svg/argentina';
import {RadioSVGMap} from "react-svg-map/src/";
import LoadingIndicator from "../loadingIndicator"
import ErrorMessage from "./errorMessage";
import SweetAlert from "react-bootstrap-sweetalert";
import {StepButton} from "./stepButton";
import {CardContent,Box} from "@material-ui/core";
import DiscreteSlider from "./slider";
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import HorizontalLabelPositionBelowStepper from "./stepper";
import {getFromLocal} from "../../services/localStorage";

const BOOTSTRAP_CLASSES = {
    filter: 'form-control',
    select: 'form-control',
    button: 'btn btn btn-block btn-default',
    buttonActive: 'btn btn btn-block btn-primary',
}
const useStyles = makeStyles(theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

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
            step: 1
        }

        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
        this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
        this.handleLocationFocus = this.handleLocationFocus.bind(this);
        this.handleLocationBlur = this.handleLocationBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        this.renderStep = this.renderStep.bind(this);
        this.goBackStep = this.goBackStep.bind(this);
        this.isLastStep = this.isLastStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    renderStep(step, values, errors, touched,setFieldValue) {
        const firstStep = <Box width="300px" m="auto">
            <div className="examples__block__info">
                <div className="examples__block__info__item">
                    Selected Province: {this.state.selectedLocation}
                </div>
            </div>
            <div style={{width: "200px"}}>
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
        </Box>;
        switch (step) {
            case 1:
                return firstStep;
            case 2:
                const selectedTown = Argentina.locations.find(element => element.name ===  this.state.selectedLocation)
                return <DiscreteSlider maxTowns={selectedTown.maxTowns} onChange={(e,val) => setFieldValue("towns",val)}/>;
            case 3:
                return <form>
                    <div>
                        <FilteredMultiSelect
                            name="users"
                            classNames={BOOTSTRAP_CLASSES}
                            onChange={this.handleSelectionChange}
                            options={this.users()}
                            selectedOptions={this.state.selectedUsers}
                        />


                        {this.state.selectedUsers.length === 0 && <p>(nothing selected yet)</p>}
                        {this.state.selectedUsers.length > 0 && <ul>
                            {this.state.selectedUsers.map((user, i) => <li key={user.id}>
                                {`${user.text} `}

                                <button type="button"
                                        onClick={() => this.handleDeselect(i)}>
                                    &times;
                                </button>
                            </li>)}
                        </ul>}
                    </div>


                </form>;
            default:
                return firstStep
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
                selectedLocation: selectedNode.attributes.name.value,
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
        const currentUser = getFromLocal('currentUser').username;
        return !this.props.errors ? this.props.users.filter((user) => user.username !== currentUser).map((user) => ({value: user.id, text: user.username})) : []
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

    isLastStep() {
        return this.state.step === 3
    }
    nextStep() {
        this.setState({step: this.state.step + 1});
    }

    goBackStep() {
        this.setState({step: this.state.step - 1});
    }

    onGameCreated() {
        return this.props.finishedCreation ? this.props.redirectGame() : null
    }

    render() {
        const validate = values => {
            const errors = {};

            if (values.towns === 0) {
                errors.towns = "Please select at least two towns";
            }

            return errors;
        };

        return (
            <Card>
                <CardContent>
                    <Formik
                        // innerRef={ref}
                        initialValues={{towns: "2"}}
                        validate={validate}
                        // validationSchema = {validator}
                        onSubmit={(values) => {
                            if (this.state.step < 3) {
                                this.nextStep()
                                return
                            }
                            console.log("VALUES:",values)
                            this.props.createGame({
                                provinceName: this.state.selectedLocation,
                                townAmount: parseInt(values.towns),
                                participantsIds: this.state.selectedUsers.map(user => user.value),
                            })
                                .setSubmitting(false);
                        }}
                        >
                        {({ values, errors, touched ,setFieldValue}) => (
                            <Form>
                                <HorizontalLabelPositionBelowStepper step={this.state.step}/>
                                {this.renderStep(this.state.step, values, errors, touched,setFieldValue)}
                                <StepButton step={this.state.step} goBack={this.goBackStep} isLastStep={this.isLastStep}/>
                            </Form>
                        )}
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
