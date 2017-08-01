// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from './AsyncComponent';

type appProps = {
  isRegistered: boolean,
}

// todo: why async components still unnamed despite using webpackChunkName?
const AsyncLoginPage = asyncComponent(() => import(/* webpackChunkName: "login" */ './LoginPage'));
const AsyncPrivatePages = asyncComponent(() => import(/* webpackChunkName: "private-pages" */ './PrivatePages'));

const App = ({ isRegistered }: appProps) => {
  if (!isRegistered && window.location.pathname !== '/login') {
    return <Redirect to="/login" />;
  } else if (isRegistered && window.location.pathname === '/login') {
    return <Redirect to="/now-playing" />;
  }
  return (
    <Switch>
      <Route path="/login" exact component={AsyncLoginPage} />
      <Route path="/" component={AsyncPrivatePages} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  isRegistered: !!state.auth.user,
});

export default connect(mapStateToProps)(App);
