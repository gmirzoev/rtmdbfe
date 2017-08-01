// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppConfig } from 'actions/initActions';
import { toggleNavigationVisibility } from 'actions/uiActions';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';
import Loading from './Loading';
import * as styles from './InnerPagesLayout.scss';

class InnerPagesLayout extends Component {
  componentDidMount() {
    this.props.getAppConfig();
  }

  props: {
    getAppConfig: Function,
    isAppInitialized: boolean,
    initializationError: boolean,
    isNavigationVisible: boolean,
    toggleNavVisibility: Function,
    children: any,
  };

  render() {
    const {
      isAppInitialized,
      initializationError,
      isNavigationVisible,
      toggleNavVisibility,
      children,
    } = this.props;

    let component;
    if (initializationError) {
      component = (
        <div className={styles.initError}>
          <div>An error has occurred during application initialization.</div>
          <div>Please check your internet connection and try to refresh the page.</div>
        </div>
      );
    } else if (!initializationError && !isAppInitialized) {
      component = <Loading />;
    } else {
      component = children;
    }

    return (
      <div className={styles.innerPagesLayout}>
        <Header handleNavigationClick={toggleNavVisibility} />
        <Navigation isVisible={isNavigationVisible} />
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
  toggleNavVisibility: () => dispatch(toggleNavigationVisibility()),
  getAppConfig: () => dispatch(getAppConfig()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerPagesLayout);
