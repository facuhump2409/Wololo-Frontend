import React, {Component} from 'react'; 
import GoogleBtn from './GoogleBtn';

class LoginComponent extends Component{
    constructor(props) {
        super (props); 

        this.state = { 
            email: "",
            password: ""
        }

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick="">Submit</button>
                <GoogleBtn/>
                <p className="forgot-password text-right">
                    Not a member yet? <a href="/sign-up">Sign up for free</a>
                </p>
            </form>
        );
    }

}

export default LoginComponent;