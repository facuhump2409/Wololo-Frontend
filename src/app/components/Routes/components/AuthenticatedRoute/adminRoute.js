import {Redirect, Route} from "react-router-dom";
import React from "react";

function AdminRoute({
                        isAdmin = false,
                        component: Component,
                        ...restOfProps
                    }) {
    return (
        <Route {...restOfProps} render={(props) => (
            isAdmin ? <Component {...props} /> : <Redirect to='/games' />
        )}/>
    )
}

export default AdminRoute;