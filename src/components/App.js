import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import InnerPagesLayout from './InnerPagesLayout';
import NowPlaying from './NowPlaying';
import Popular from './Popular';
import TopRated from './TopRated';
import Upcoming from './Upcoming';
import SearchPage from './SearchPage';
import NoMatch from './NoMatch';

const App = ({ isRegistered }) => {
  if (!isRegistered) {
    return <LoginPage />;
  }
  return (
    <InnerPagesLayout>
      <Switch>
        <Route path="/" exact component={NowPlaying} />
        <Route path="/popular" component={Popular} />
        <Route path="/top" component={TopRated} />
        <Route path="/upcoming" component={Upcoming} />
        <Route path="/search" component={SearchPage} />
        <Route component={NoMatch} />
      </Switch>
    </InnerPagesLayout>
  );
};

App.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isRegistered: !!state.auth.user,
});

export default connect(mapStateToProps)(App);
