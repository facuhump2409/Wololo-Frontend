import React from 'react';
import { Formik } from "formik"
import * as EmailValidator from "email-validator"
import * as Yup from "yup"
import GoogleBtn from './GoogleBtn';

const ValidatedLoginForm = () => (
    <Formik
        initialValues={{email: "", password:""}}
        onSubmit={(values, {setSubmitting}) => {
            // console.log("Submitting") handle the login
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
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input 
                            name="email"
                            type="email"
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
                            // className={errors.password && touched.password && "error"}
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
                        <GoogleBtn/>
                        <p className="forgot-password text-right">
                            Not a member yet? <a href="/sign-up">Sign up for free</a>
                        </p>
                    </form>
                )
                }
            }
    </Formik>
);
export default ValidatedLoginForm;