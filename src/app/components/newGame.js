import React from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'
import {Formik} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { getUsers } from '../../services/users';
import { createGame } from '../../services/games';
import {GET_USERS, CREATE_GAME, REDIRECT_GAME} from '../../redux/actionTypes';
import {LoadingIndicator} from "../loadingIndicator";
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
        gamesErrors: state.games.errors
    }};

const mapDispatchToProps = dispatch => ({
    getParticipants: () => dispatch({ type: GET_USERS, payload: getUsers }),
    createGame: (gameData) => dispatch({type: CREATE_GAME, payload: createGame(gameData) }),
    redirectGame: () => dispatch({ type: REDIRECT_GAME })
})

class NewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUsers: [],
        }

    }

    componentDidMount() {
        this.props.getParticipants();
    }

    getInitialState = () => {
        return {
            value: 'select'
        }
    };

    users() {
        return !this.props.errors ? this.props.users.map((user, index) => ({ value: user.id, text: user.username })) : []
    }

    handleSelectionChange = (selectedUsers) => {
        this.setState({selectedUsers})
    }

    handleDeselect(index) {
        const selectedUsers = this.state.selectedUsers.slice();
        selectedUsers.splice(index, 1)
        this.setState({selectedUsers})
    }

    onGameCreated() {
        console.log('MIRAR',this.props.finishedCreation)
        return this.props.finishedCreation? this.props.redirectGame() : null
    }

    render() {
        const selectedUsers = this.state.selectedUsers;
        console.log("in progress:",this.props.inProgress)
        return (
            <div>
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <label>Create New Game</label>

                            <Formik
                                initialValues={{selectProvince: "", towns: ""}}
                                onSubmit={(values, {setSubmitting}) => {
                                    this.props.createGame({
                                        provinceName: values.selectProvince,
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
                                                handleChange
                                            } = props;
                                    return (<form onSubmit={handleSubmit}>
                                        <fieldset>
    
                                            <fieldset className="form-group">
                                                <div>
                                                    <select name="selectProvince" className="form-control"
                                                            onChange={handleChange}
                                                            value={this.state.value}>
                                                        <option value="">Select Province</option>
                                                        <option value="Buenos Aires">Buenos Aires</option>
                                                        <option value="CABA">CABA</option>
                                                        <option value="Cordoba">Cordoba</option>
                                                    </select>
                                                </div>
    
                                            </fieldset>
    
                                            <fieldset className="form-group">
                                                <input
                                                    name="towns"
                                                    className="form-control"
                                                    type="text"
                                                    onChange={handleChange}
                                                    placeholder="Number of towns"
                                                />
                                            </fieldset>
    
    
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
    
                                                            <button type="button" onClick={() => this.handleDeselect(i)}>
                                                                &times;
                                                            </button>
                                                        </li>)}
                                                    </ul>}
                                                </div>
    
    
                                            </fieldset>
                                            
                                                <button
                                                    className="btn btn-lg pull-xs-right btn-primary"
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
                            <ErrorMessage errors={this.props.gamesErrors} />
                            <SweetAlert
                                success
                                title="Game Created Succesfully!"
                                onConfirm={() => this.onGameCreated()}
                                onCancel={() => this.onGameCreated()}
                                timeout={1000}
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
