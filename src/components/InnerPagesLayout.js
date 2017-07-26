import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppConfig } from 'actions/initActions';
import { toggleNavigationVisibility } from 'actions/uiActions';
import PropTypes from 'prop-types';
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

  render() {
    const { isAppInitialized, isNavigationVisible, toggleNavVisibility, children } = this.props;
    return (
      <div className={styles.innerPagesLayout}>
        <Header handleNavigationClick={toggleNavVisibility} />
        <Navigation isVisible={isNavigationVisible} />
        <Main>
          {isAppInitialized ? children : <Loading />}
        </Main>
        <Footer />
      </div>
    );
  }
}

InnerPagesLayout.propTypes = {
  getAppConfig: PropTypes.func.isRequired,
  isAppInitialized: PropTypes.bool.isRequired,
  isNavigationVisible: PropTypes.bool.isRequired,
  toggleNavVisibility: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => ({
  isAppInitialized: state.init.requests === 0,
  isNavigationVisible: state.ui.isNavigationVisible,
});

const mapDispatchToProps = dispatch => ({
  toggleNavVisibility: () => dispatch(toggleNavigationVisibility()),
  getAppConfig: () => dispatch(getAppConfig()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerPagesLayout);
