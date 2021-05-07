import React from 'react';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import App from "../App/App";
import SignIn from "../pages/SigninPages/AdminSignIn";
import VendorSignIn from "../pages/SigninPages/VendorSignIn";
import CustomerSignIn from "../pages/SigninPages/CustomerSignIn";
import NewVendorReg from "../pages/CustomerApprover/NewVendorReg";
import CustomerApprover from "../pages/CustomerApprover/ApproverHomePage";
import ActionVendorApprover from "../pages/CustomerApprover/ActionVendorApproval/main";
import ErrorPage from "../pages/404/ErrorPage";
import ProfileMan from "../pages/ProfileMan/main";
import AdminApp from "../pages/Admin/AdminApp";
import CustomerApp from "../pages/Customer/CustomerApp";
import CustomerUser from "../pages/CustomerUser/CustomerUserHomePage";
import ManageIndividualCustomer from "../pages/ManageIndividualCustomer/ManageIndividualCustomer";

function Routers() {
    return (
        <Router>
            <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/VendorSignIn" exact component={VendorSignIn} />
            <Route path="/CustomerSignIn" exact component={CustomerSignIn} />
            <Route path="/Vendor" component={App} />
            <Route path="/NewVendorReg" component={ NewVendorReg } />
            <Route path="/CustomerApprover" component={ CustomerApprover } />
            <Route path="/ProfileMan" component={ ProfileMan } />
            <Route path="/AdminApp" component={ AdminApp } />
            <Route path="/CustomerApp" component={ CustomerApp } />
            <Route path="/ActionVendorApprover" component={ ActionVendorApprover } />
            <Route path="/CustomerUser" component={ CustomerUser } />
            <Route path="/ManageIndividualCustomer" component={ ManageIndividualCustomer } />
            <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default Routers;
