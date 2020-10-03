import React from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'
import {Formik} from "formik";
import * as Yup from "yup";
import {getUsers} from '../../services/users';
import {createGame, getProvinces} from '../../services/games';
import {CREATE_GAME, GET_PROVINCES, GET_USERS, REDIRECT_GAME} from '../../redux/actionTypes';
import Argentina from '../../svg/argentina';
import {RadioSVGMap} from "react-svg-map/src/";
import LoadingIndicator from "../loadingIndicator"
import ErrorMessage from "./errorMessage";
import SweetAlert from "react-bootstrap-sweetalert";

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
            selectedLocation: null
        }

        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
        this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
        this.handleLocationFocus = this.handleLocationFocus.bind(this);
        this.handleLocationBlur = this.handleLocationBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);

    }

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
        if (provinces.includes(this.state.selectedLocation)) {
            console.log(this.state.selectedLocation + "Included")
            return true
        } else {
            return false
        }

    }

    onGameCreated() {
        return this.props.finishedCreation ? this.props.redirectGame() : null
    }

    render() {
        const selectedUsers = this.state.selectedUsers;
        console.log("in progress:", this.props.inProgress)
        return (
            <div>
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <label>Create New Game</label>

                            <Formik
                                initialValues={{selectProvince: "", towns: ""}}
                                onSubmit={(values) => {
                                    this.props.createGame({
                                        provinceName: this.state.selectedLocation,
                                        townAmount: parseInt(values.towns),
                                        participantsIds: this.state.selectedUsers.map(user => user.value),
                                    })
                                        .setSubmitting(false);
                                }}
                                validator={() => Yup.object().shape({
                                    selectProvince: Yup.string()
                                        .required("Please select a state"),
                                    towns: Yup.number().required("Please enter the number of towns")
                                })
                                }>
                                {
                                    props => {
                                        const {
                                            handleSubmit,
                                            handleChange,
                                            errors,
                                            touched
                                        } = props;
                                        return (<form onSubmit={handleSubmit}>
                                            <fieldset>
                                                <fieldset width="300px">
                                                    <article className="examples__block" width="300px">
                                                        <h2 className="examples__block__title">
                                                            Select province
                                                        </h2>
                                                        <div className="examples__block__info">
                                                            <div className="examples__block__info__item">
                                                                Selected Province: {this.state.selectedLocation}
                                                            </div>
                                                        </div>
                                                        <div style={{width: "300px"}}>
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
                                                </fieldset>
                                                {errors.selectProvince && touched.selectProvince && (
                                                    <div className="input-feedback">{errors.selectProvince}</div>
                                                )}


                                                <fieldset className="form-group">
                                                    <input
                                                        name="towns"
                                                        className="form-control"
                                                        type="text"
                                                        onChange={handleChange}
                                                        placeholder="Number of towns"
                                                    />
                                                </fieldset>
                                                {errors.towns && touched.towns && (
                                                    <div className="input-feedback">{errors.towns}</div>
                                                )}


                                                <fieldset className="form-group">
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


                                                </fieldset>

                                                <button
                                                    className="btn btn-lg pull-xs-right btn-primary"
                                                    onClick={() => this.validateForm()}
                                                    type="submit"
                                                >
                                                    Create New Game
                                                </button>

                                            </fieldset>
                                        </form>)
                                    }
                                }
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
