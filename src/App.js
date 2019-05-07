import React, {Suspense, useEffect} from 'react';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import Logout from "./containers/Auth/Logout/Logout";

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const app = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Route path="/" component={BurgerBuilder}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
                <Route path="/orders" render={(props) => <Orders {...props}/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" render={(props) => <Auth {...props}/>}/>
                <Route path="/" component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
