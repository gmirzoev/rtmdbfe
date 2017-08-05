// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { hideNavigation } from 'actions/uiActions';
import PrivatePagesLayout from './PrivatePagesLayout';
import AsyncNowPlaying from './NowPlaying';
import AsyncPopular from './Popular';
import AsyncTopRated from './TopRated';
import AsyncUpcoming from './Upcoming';
import AsyncSearch from './SearchPage';
import NoMatch from './NoMatch';

class PrivatePages extends Component {
  componentDidMount() {
    this.navigationEl = document.querySelector('nav');
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  props: privatePageProps;

  navigationEl = null;

  handleDocumentClick = (e: MouseEvent) => {
    const target = (e.target: any);
    if (!this.navigationEl || this.navigationEl.contains(target) || target.classList.contains('js-menu')) return;
    this.props.handleHideNavigation();
  };

  render() {
    if (window.location.pathname === '/') {
      return <Redirect to="/now-playing" />;
    }
    return (
      <PrivatePagesLayout>
        <Switch>
          <Route path="/now-playing" component={AsyncNowPlaying} />
          <Route path="/popular" component={AsyncPopular} />
          <Route path="/top" component={AsyncTopRated} />
          <Route path="/upcoming" component={AsyncUpcoming} />
          <Route path="/search" component={AsyncSearch} />
          <Route component={NoMatch} />
        </Switch>
      </PrivatePagesLayout>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  handleHideNavigation: () => dispatch(hideNavigation()),
});

export default withRouter(connect(undefined, mapDispatchToProps)(PrivatePages));
