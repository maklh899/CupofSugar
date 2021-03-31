/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({
    component,
    path,
    ...rest
}) => {
    const { currentUser } = useSelector(
        (state) => state.authentication,
    );
    return currentUser !== null ? (
        <Route exact path={path} component={component} {...rest} />
    ) : (
        <Redirect to="/" />
    );
};

// PrivateRoute.propTypes = {
//     component: PropTypes.element.isRequired,
//     path: PropTypes.string.isRequired,
// };

export default PrivateRoute;
