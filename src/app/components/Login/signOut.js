import React from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../../redux/actions';
import {Redirect} from "react-router-dom";

function SignOut(props) {
    props.signOutUser()
    return (
        <p> Logged Out Succesfully you may return to home page </p>
        // TODO hacer un popup que diga "deslogueado redireccionando a home"
        // <Redirect to="/" />
    )
}

export default connect(null, { signOutUser })(SignOut);
