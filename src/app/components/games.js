import React from 'react';
import {connect} from 'react-redux';
import FilteredMultiSelect from 'react-filtered-multiselect'

import {
    ADD_TAG,
    ARTICLE_SUBMITTED,
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    REMOVE_TAG,
    UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';


const mapStateToProps = state => ({
    // ...state.editor
});

const mapDispatchToProps = dispatch => ({
    onAddTag: () =>
        dispatch({type: ADD_TAG}),
    onLoad: payload =>
        dispatch({type: EDITOR_PAGE_LOADED, payload}),
    onRemoveTag: tag =>
        dispatch({type: REMOVE_TAG, tag}),
    onSubmit: payload =>
        dispatch({type: ARTICLE_SUBMITTED, payload}),
    onUnload: payload =>
        dispatch({type: EDITOR_PAGE_UNLOADED}),
    onUpdateField: (key, value) =>
        dispatch({type: UPDATE_FIELD_EDITOR, key, value})
});


class Games extends React.Component {
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

        const updateFieldEvent =
            key => ev => this.props.onUpdateField(key, ev.target.value);
        this.changeTitle = updateFieldEvent('title');
        this.changeDescription = updateFieldEvent('description');
        this.changeBody = updateFieldEvent('body');
        this.changeTagInput = updateFieldEvent('tagInput');

        this.watchForEnter = ev => {
            if (ev.keyCode === 13) {
                ev.preventDefault();
                this.props.onAddTag();
            }
        };

        this.removeTagHandler = tag => () => {
            this.props.onRemoveTag(tag);
        };

        this.submitForm = ev => {
            ev.preventDefault();
            const article = {
                title: this.props.title,
                description: this.props.description,
                body: this.props.body,
                tagList: this.props.tagList
            };

            const slug = {slug: this.props.articleSlug};
            /*
                  const promise = this.props.articleSlug ?
                      agent.Articles.update(Object.assign(article, slug)) :
                      agent.Articles.create(article);
            */

            // this.props.onSubmit(promise);
        };
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
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">

                            {/*<ListErrors errors={this.props.errors}></ListErrors>*/}

                            <form>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <div>
                                            <select id="lang" className="form-control" onChange={this.handleChange}
                                                    value={this.state.value}>
                                                <option value="Select Province ">Select Province</option>
                                                <option value="Buenos Aires">Buenos Aires</option>
                                                <option value="CABA">CABA</option>
                                                <option value="Cordoba">Cordoba</option>
                                            </select>
                                        </div>

                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Number of towns"
                                            value={this.props.description}
                                            onChange={this.changeDescription}/>
                                    </fieldset>


                                    <fieldset className="form-group">


                                        <FilteredMultiSelect

                                            onChange={this.handleSelectionChange}
                                            options={this.usersOptions}
                                            selectedOptions={selectedUsers}
                                        />
                                        {selectedUsers.length === 0 && <p>(nothing selected yet)</p>}
                                        {selectedUsers.length > 0 && <ul>
                                            {selectedUsers.map((user, i) => <li key={user.id}>
                                                {`${user.text} `}
                                                <button type="button"  onClick={() => this.handleDeselect(i)}>
                                                    &times;
                                                </button>
                                            </li>)}
                                        </ul>}
                                    </fieldset>

                                    <button
                                        className="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        disabled={this.props.inProgress}
                                        onClick={this.submitForm}>
                                        Create New Game
                                    </button>

                                </fieldset>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
