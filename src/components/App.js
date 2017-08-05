// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from './AsyncComponent';

// fixme: replace System.import() with import() as soon as chunk namings will work with it
const AsyncLoginPage = asyncComponent(() => System.import(/* webpackChunkName: "login" */ './LoginPage'));
const AsyncPrivatePages = asyncComponent(() => System.import(/* webpackChunkName: "private-pages" */ './PrivatePages'));

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
