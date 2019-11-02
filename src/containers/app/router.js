import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../login";
import DashBoard from "../dashboard";
import NotFound from "../errors/NotFound";
import If from "../../components/control/If";

class Router extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={DashBoard}/>
                    <Route path="" component={NotFound} />
                </Switch>
            </div>
        );
    }
}



export default Router;