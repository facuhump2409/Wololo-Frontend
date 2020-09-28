import React from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'
import {Formik} from "formik";
import * as Yup from "yup";
import {getUsers} from '../../services/users';
import {createGame} from '../../services/games';
import {CREATE_GAME, GET_USERS} from '../../redux/actionTypes';
import Australia from '@svg-maps/australia';
import RadioSVGMap from "react-svg-map";


const BOOTSTRAP_CLASSES = {
    filter: 'form-control',
    select: 'form-control',
    button: 'btn btn btn-block btn-default',
    buttonActive: 'btn btn btn-block btn-primary',
}


const mapStateToProps = (state) => ({...state.users});

const mapDispatchToProps = dispatch => ({
    getParticipants: () => dispatch({type: GET_USERS, payload: getUsers}),
    createGame: (gameData) => dispatch({type: CREATE_GAME, payload: createGame(gameData)})
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
    }

    getInitialState () {
        return {
            value: 'select'
        }
    };

    users() {
        return !this.props.errors ? this.props.users.map((user, index) => ({value: user.id, text: user.username})) : []
    }

    handleSelectionChange (selectedUsers)  {
        this.setState({selectedUsers})
    }

    handleDeselect(index) {
        const selectedUsers = this.state.selectedUsers.slice();
        selectedUsers.splice(index, 1)
        this.setState({selectedUsers})
    }


    render() {
        const selectedUsers = this.state.selectedUsers;
        return (
            <div>
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <label>Create New Game</label>
                            <article className="examples__block">
                                <h2 className="examples__block__title">
                                    Australia SVG map as radio buttons
                                </h2>
                                <div className="examples__block__info">
                                    <div className="examples__block__info__item">
                                        Pointed location: {this.state.pointedLocation}
                                    </div>
                                    <div className="examples__block__info__item">
                                        Focused location: {this.state.focusedLocation}
                                    </div>
                                    <div className="examples__block__info__item">
                                        Selected location: {this.state.selectedLocation}
                                    </div>
                                </div>
                                <div
                                    className="examples__block__map examples__block__map--australia">
                                    <RadioSVGMap
                                        map={Australia}
                                        onLocationMouseOver={this.handleLocationMouseOver}
                                        onLocationMouseOut={this.handleLocationMouseOut}
                                        onLocationFocus={this.handleLocationFocus}
                                        onLocationBlur={this.handleLocationBlur}
                                        onChange={this.handleOnChange}/>
                                </div>
                            </article>

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

                                                {/*<fieldset className="form-group">*/}
                                                {/*    <div>*/}
                                                {/*        <select name="selectProvince" className="form-control"*/}
                                                {/*                onChange={handleChange}*/}
                                                {/*                value={this.state.value}>*/}
                                                {/*            <option value="">Select Province</option>*/}
                                                {/*            <option value="Buenos Aires">Buenos Aires</option>*/}
                                                {/*            <option value="CABA">CABA</option>*/}
                                                {/*            <option value="Cordoba">Cordoba</option>*/}
                                                {/*        </select>*/}
                                                {/*    </div>*/}

                                                {/*</fieldset>*/}


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
                                                    type="submit"
                                                >
                                                    Create New Game
                                                </button>

                                            </fieldset>
                                        </form>)
                                    }
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


class ArgentinaMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pointedLocation: null,
            focusedLocation: null,
            selectedLocation: null
        };

        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
        this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
        this.handleLocationFocus = this.handleLocationFocus.bind(this);
        this.handleLocationBlur = this.handleLocationBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
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

    render() {
        return (
            <article className="examples__block">
                <h2 className="examples__block__title">
                    Australia SVG map as radio buttons
                </h2>
                <div className="examples__block__info">
                    <div className="examples__block__info__item">
                        Pointed location: {this.state.pointedLocation}
                    </div>
                    <div className="examples__block__info__item">
                        Focused location: {this.state.focusedLocation}
                    </div>
                    <div className="examples__block__info__item">
                        Selected location: {this.state.selectedLocation}
                    </div>
                </div>
                <div className="examples__block__map examples__block__map--australia">
                    <RadioSVGMap
                        map={Australia}
                        onLocationMouseOver={this.handleLocationMouseOver}
                        onLocationMouseOut={this.handleLocationMouseOut}
                        onLocationFocus={this.handleLocationFocus}
                        onLocationBlur={this.handleLocationBlur}
                        onChange={this.handleOnChange}/>
                </div>
            </article>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
