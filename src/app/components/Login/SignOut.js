import {connect} from "react-redux";
import {LOGOUT} from "../../../redux/actionTypes";
import {signOut} from "../../../services/auth";

const mapDispatchToProps = dispatch => ({
    onSignOut: () =>
        dispatch({type: LOGOUT, payload: signOut()})
});
function SignOutComponent (props) {
    props.onSignOut()
    return null
}

export default connect(null, mapDispatchToProps)(SignOutComponent);