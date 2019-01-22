import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isUser, component: Component, ...rest }) => (
  <Route {...rest} component={(props) => (
    isUser ? (
      <Redirect to="/dashboard" />
    ) : (
        <Component {...props} />
      )
  )} />
);

const mapStateToProps = (state) => ({
  isUser: !!state.auth.token
});

export default connect(mapStateToProps)(PublicRoute);