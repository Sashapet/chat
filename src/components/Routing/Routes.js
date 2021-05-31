import React from 'react'
import {Route, Switch} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import PageNotFound from '../PageNotFound'

const Routes = () => {
    return (
    <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route component={PageNotFound} />
    </Switch>
    )
}
export default Routes;