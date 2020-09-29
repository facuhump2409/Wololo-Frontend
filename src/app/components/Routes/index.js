import React, {useEffect} from 'react';

import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Home from '../home';
import SignUpComponent from '../Login/signup';
import Games from '../GamesList'
import Header from '../Header'
import ValidatedLoginForm from "../Login/validatedLoginForms"
import NewGame from '../newGame'
import Game from '../Game';
import {LOGOUT, REDIRECT} from "../../../redux/actionTypes";
import {signOut} from "../../../services/auth";
import SignOutComponent from "../Login/SignOut";
import {withRouter} from 'react-router'

const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo,
        isAuthorized: state.auth.isAuthorized
    }
};

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
        dispatch({type: REDIRECT}),
    onSignOut: () =>
        dispatch({type: LOGOUT, payload: signOut()})
});

function RoutesContainer(props) {

    useEffect(() => {
        console.log("Props que estan updateadas", props.redirectTo)
        if (props.redirectTo) {
            props.history.push(props.redirectTo)
            props.onRedirect();
        }
    })

    return (
        <Router>
            <div className="App">
                <Header>

                </Header>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path="/sign_in" component={ValidatedLoginForm}/>
                    <Route path="/sign_up" component={SignUpComponent}/>
                    <Route key="sign-out-button" path="/sign_out" component={SignOutComponent}/>
                    <AuthenticatedRoute path='/games' component={Games} isAuthenticated={props.isAuthorized}/>
                    <AuthenticatedRoute path='/newGame' component={NewGame} isAuthenticated={props.isAuthorized}/>
                    <AuthenticatedRoute path='/game/:id' component={Game} isAuthenticated={props.isAuthorized}/>
                </Switch>
            </div>
        </Router>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoutesContainer));