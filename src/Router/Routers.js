import React from 'react';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import App from "../App/App";
import SignIn from "../pages/SigninPages/AdminSignIn";
import ErrorPage from "../pages/404/ErrorPage";
import AdminApp from "../pages/Admin/AdminApp";

function Routers() {
    return (
        <Router>
            <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/Vendor" component={App} />
            <Route path="/AdminApp" component={ AdminApp } />
            <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default Routers;
