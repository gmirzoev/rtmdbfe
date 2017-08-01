// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import InnerPagesLayout from './InnerPagesLayout';

import AsyncNowPlaying from './NowPlaying';
import AsyncPopular from './Popular';
import AsyncTopRated from './TopRated';
import AsyncUpcoming from './Upcoming';
import AsyncSearch from './SearchPage';
import NoMatch from './NoMatch';

const PrivatePages = () => {
  if (window.location.pathname === '/') {
    return <Redirect to="/now-playing" />;
  }
  return (
    <InnerPagesLayout>
      <Switch>
        <Route path="/now-playing" component={AsyncNowPlaying} />
        <Route path="/popular" component={AsyncPopular} />
        <Route path="/top" component={AsyncTopRated} />
        <Route path="/upcoming" component={AsyncUpcoming} />
        <Route path="/search" component={AsyncSearch} />
        <Route component={NoMatch} />
      </Switch>
    </InnerPagesLayout>
  );
};

export default PrivatePages;
