import React, {Component} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {SIGNUP} from "../../../redux/actionTypes";
import {connect} from "react-redux";
import {signUp} from "../../../services/auth";
import ListErrors from "../ListErrors";

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onSignUp: (values) =>
        dispatch({ type: SIGNUP, payload: signUp(values) })
});

class SignUpComponent extends Component{
    constructor(props) {
        super (props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        this.props.onSignUp(values)
    }

    render() {
        return(
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Formik
                        initialValues={{email: "", password:"",username: ""}}
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
                                    handleChange,
                                    handleSubmit,
                                    handleBlur,
                                } = props;
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <h3>Sign Up</h3>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text"
                                                   name="username"
                                                   className="form-control" 
                                                   placeholder="Username"
                                                   value={values.username}
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
                                        

                                        <button type="submit" className="btn btn-primary btn-block" disabled={this.props.inProgress}>Sign Up</button>
                                        <p className="forgot-password text-right">
                                            Already registered <a href="/sign-in">Sign In</a>
                                        </p>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                    <ListErrors errors={this.props.errors} />
                </div>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
