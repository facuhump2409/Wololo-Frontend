import React, {Component} from 'react'; //esto me deja crear mi propio componente
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'; //sirve para nuestro login
import GoogleBtn from './GoogleBtn';

class LoginComponent extends Component{
    constructor(props) {
        super (props); //required whenever we create component

        this.state = { 
            selectedDish: null //nothing is selected
        }

        console.log('Menu constructor invoked')
    }

    render() {
        return (
            <form>
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

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                <GoogleBtn/>
            </form>
        );
    }

}

export default LoginComponent;