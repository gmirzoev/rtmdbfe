// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppConfig } from 'actions/initActions';
import { toggleNavigation } from 'actions/uiActions';
import { logout } from 'actions/authActions';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';
import Loading from './Loading';
import * as styles from './PrivatePagesLayout.scss';

class PrivatePagesLayout extends Component {
  componentDidMount() {
    this.props.getAppConfig();
  }

  props: privatePageLayoutProps;

  links: navLink[] = [
    { title: 'Now playing', url: '/now-playing' },
    { title: 'Popular', url: '/popular' },
    { title: 'Top', url: '/top' },
    { title: 'Upcoming', url: '/upcoming' },
    { title: 'Search', url: '/search' },
  ];

  render() {
    const {
      isAppInitialized,
      initializationError,
      isNavigationVisible,
      handleToggleNavigation,
      handleLogout,
      children,
    } = this.props;

    let component;
    if (initializationError) {
      component = (
        <div className={styles.initError}>
          <div className={styles.initErrorText}>
            An error has occurred during application initialization.
          </div>
          <div className={styles.initErrorText}>
            Please, check your internet connection and try to refresh the page.
          </div>
        </div>
      );
    } else if (!initializationError && !isAppInitialized) {
      component = <Loading />;
    } else {
      component = children;
    }

    return (
      <div className={styles.privatePagesLayout}>
        <Header onNavigationBtnClick={handleToggleNavigation} />
        <Navigation
          isVisible={isNavigationVisible}
          links={this.links}
          onLogout={handleLogout}
        />
        <Main>{component}</Main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAppInitialized: state.init.requests === 0,
  initializationError: state.init.error,
  isNavigationVisible: state.ui.isNavigationVisible,
});

const mapDispatchToProps = (dispatch: Function) => ({
  handleToggleNavigation: () => dispatch(toggleNavigation()),
  handleLogout: () => dispatch(logout()),
  getAppConfig: () => dispatch(getAppConfig()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePagesLayout);
