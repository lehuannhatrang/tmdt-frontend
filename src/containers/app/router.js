import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../login";
import DashBoard from "../dashboard";
import Cart from "../cart";
import Checkout from "../checkout";
import NotFound from "../errors/NotFound";
import Shopping from "../shopping";
import ProductInfo from "../product-info";
import Contact from "../contact";
import If from "../../components/control/If";
import Done from "../done"

class Router extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    {/* <Route exact path="/logout" component={Logout}/> */}
                    <Route exact path="/done" component={Done}/>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/checkout" component={Checkout}/>
                    <Route exact path="/shopping" component={Shopping} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/product/:id" component={ProductInfo} />
                    <Route path="" component={NotFound} />
                </Switch>
            </div>
        );
    }
}



export default Router;