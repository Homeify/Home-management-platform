import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../utils/routes';

function PrivateRoute({ authenticated, children }) {
    return authenticated ? children : <Navigate to={ROUTES.SIGN_IN} />;
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.authenticated,
    };
};

export default connect(mapStateToProps)(PrivateRoute);