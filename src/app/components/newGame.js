import React from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'
import {Formik} from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom";

const BOOTSTRAP_CLASSES = {
    filter: 'form-control',
    select: 'form-control',
    button: 'btn btn btn-block btn-default',
    buttonActive: 'btn btn btn-block btn-primary',
}


const mapStateToProps = () => ({
    // ...state.editor
});


class NewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'select',
            selectedUsers: []
        }
        this.usersOptions = [
            {value: 1, text: 'User 1'},
            {value: 2, text: 'User 2'}
        ];

    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    getInitialState = () => {
        return {
            value: 'select'
        }
    };

    handleSelectionChange = (selectedUsers) => {
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

                            <Formik
                                initialValues={{selectProvince: "", password: ""}}
                                onSubmit={() => {
                                }}
                                validationSchema={Yup.object().shape({
                                    selectProvince: Yup.string()
                                        .required("Please select a state"),
                                    towns: Yup.number().required("Please enter the number of towns")

                                })
                                }>

                                <form>
                                    <fieldset>

                                        <fieldset className="form-group">
                                            <div>
                                                <select name="selectProvince" className="form-control"
                                                        onChange={this.handleChange}
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
                                                    options={this.usersOptions}
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
                                        <Link to='/games'>
                                            <button
                                                className="btn btn-lg pull-xs-right btn-primary"
                                                type="submit"
                                                onClick={this.submitForm}>
                                                Create New Game
                                            </button>
                                        </Link>
                                    </fieldset>
                                </form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps)(NewGame);
