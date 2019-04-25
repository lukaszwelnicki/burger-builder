import React, {Component} from 'react';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import Logout from "./containers/Auth/Logout/Logout";

const asyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const asyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
