import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions';
import { Formik } from "formik"
import * as Yup from "yup"
import GoogleBtn from './GoogleBtn';
import {trackPromise} from "react-promise-tracker";

class ValidatedLoginForm extends React.Component {
    constructor(props) {
        super (props);
        // this.handleSuccesfulAuth = this.handleSuccesfulAuth(this);
        // this.handleErrorAuth = this.handleErrorAuth(this);
    }


    // handleSuccesfulAuth() {

    // }

    // handleErrorAuth() {

    // }

    render() {
        return(
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Formik
                initialValues={{mail: "", password:""}}
                onSubmit={(values,{setSubmitting}) => {
                    setSubmitting(true)
                    // this.props.loginUser(values)
                    trackPromise(this.props.loginUser(values).then(()=> { //TODO cambiar por then catch cuando hagamos con back
                        localStorage.setItem('isAuthorized', true);
                        return this.props.history.push(`/`)
                    }).catch(error=>{
                        return <p>Couldn't sign in correctly, please try again later</p>}))
                    // if (this.props.isAuthorized) {
                    //     localStorage.setItem('isAuthorized', true);
                    //     this.props.history.push(`/`)
                    // }
                }}
                validationSchema = {Yup.object().shape({
                    mail: Yup.string()
                    .email("Incorrect email format")
                    .required("Please enter a valid email"),
                    password: Yup.string()
                    .required("Enter a password")
                    .min(8,"Password is too short - should be 8 characters minimum")
                    .matches(/(?=.*[0-9])/,"Password must contain at least a number")
                })

                }>
                    {
                        props => {
                            const { values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleSubmit,
                                    handleBlur,
                                } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <h3>Sign In</h3>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                    name="mail"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    // className={errors.email && touched.email && "error"}
                                    />
                                </div>
                                {errors.mail && touched.mail && (
                                    <div className="input-feedback">{errors.mail}</div>
                                )}

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                </div>
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Submit</button>
                                <GoogleBtn handleSuccesfulAuth={props.login}/>
                                <p className="forgot-password text-right">
                                    Not a member yet? <a href="/sign-up">Sign up for free</a>
                                </p>
                            </form>
                        )
                        }
                    }
            </Formik>
                    </div>
                    </div>
        )
    }
}

const auth = state => { 
    return ({ isAuthorized: state.auth.isAuthorized })
    }

export default connect(auth, { loginUser })(ValidatedLoginForm);
