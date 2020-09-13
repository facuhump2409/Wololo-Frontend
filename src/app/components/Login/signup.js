import React, {Component} from 'react';
import GoogleBtn from './GoogleBtn';
import {signUp} from "../../../services/auth";
import {Formik} from "formik";
import {Redirect} from "react-router-dom";
import * as Yup from "yup";

class SignUpComponent extends Component{
    constructor(props) {
        super (props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSign = this.handleSign.bind(this);
    }

    handleSign() {
        this.props.history.push(`/`)
        // return <Redirect to="/sign_in"/>
    }

    handleSubmit(values){
        console.log(values)
        this.handleSign()
        // this.signUp(values).then(()=> { //TODO cambiar despues a signUp(values) que le pega posta a back
        //     return this.props.history.push(`/`)
        // }).catch(error=>{
        //     return <p>Couldn't sign up correctly, please try again later</p>})
    }

    render() {
        return(
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Formik
                        initialValues={{email: "", password:"",firstName: "",lastName: ""}}
                        onSubmit={(values) => {
                            this.handleSubmit(values)
                        }}
                        validationSchema = {Yup.object().shape({
                            email: Yup.string()
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
                                        <h3>Sign Up</h3>
                                        <div className="form-group">
                                            <label>First name</label>
                                            <input type="text"
                                                   name="firstName"
                                                   className="form-control" 
                                                   placeholder="First name" 
                                                   value={values.name} 
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Last name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                placeholder="Last name"
                                                value={values.lastname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                // className={errors.email && touched.email && "error"}
                                            />
                                        </div>
                                        {errors.email && touched.email && (
                                            <div className="input-feedback">{errors.email}</div>
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
                                        

                                        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Sign Up</button>
                                        <p className="forgot-password text-right">
                                            Already registered <a href="/sign-in">Sign In</a>
                                        </p>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>
        );
    }

}

export default SignUpComponent;