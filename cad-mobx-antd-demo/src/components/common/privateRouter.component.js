import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';

const PrivateRoute = inject('rootStore')(withRouter(observer(({ rootStore, component: Component, ...rest }) => {
    return <Route {...rest} render={props => {
        if (rootStore.logstate.isLogin) {
            return <Component {...props} />;
        } else {
            return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />;
        }
    }}
    />
})));

export default PrivateRoute;