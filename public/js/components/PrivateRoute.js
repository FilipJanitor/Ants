import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

const mapStateToProps = state => ({
  auth: state.appState.auth
});

export default connect(mapStateToProps)(PrivateRoute);