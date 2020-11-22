import React, {Component} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {SIGNUP} from "../../../redux/actionTypes";
import {connect} from "react-redux";
import {signUp} from "../../../services/auth";
import ErrorMessage from "../errorMessage";

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
                        initialValues={{mail: "", password:"",username: "", confirmPassword: ""}}
                        onSubmit={(values) => {
                            this.handleSubmit(values)
                        }}
                        validationSchema = {Yup.object().shape({
                            mail: Yup.string()
                                .email("Incorrect email format")
                                .required("Please enter a valid email"),
                            password: Yup.string()
                                .required("Enter a password")
                                .min(8,"Password is too short - should be 8 characters minimum")
                                .matches(/(?=.*[0-9])/,"Password must contain at least a number"),
                            confirmPassword: Yup.string()
                                .required("Confirm password")
                                .label("Confirm password")
                                .test("password-match", "Those passwords didn't match. Try Again",function (value) {
                                    return this.parent.password === value;
                                })
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
                                                type="mail"
                                                name="mail"
                                                className="form-control"
                                                placeholder="Enter email"
                                                value={values.mail}
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
                                            <label>Confirm password</label>
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter password"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <div className="input-feedback">{errors.confirmPassword}</div>
                                        )}

                                        <button type="submit" className="btn btn-primary btn-block" disabled={this.props.inProgress}>Sign Up</button>
                                        <p className="forgot-password text-right">
                                            Already registered <a href="/sign_in">Sign In</a>
                                        </p>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                    <ErrorMessage errors={this.props.errors} />
                </div>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
