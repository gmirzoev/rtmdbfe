import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigationVisibility } from 'actions/uiActions';
import PropTypes from 'prop-types';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import NowPlaying from './NowPlaying';
import Popular from './Popular';
import TopRated from './TopRated';
import Upcoming from './Upcoming';
import SearchPage from './SearchPage';
import NoMatch from './NoMatch';
import Footer from './Footer';
import * as styles from './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { // todo: move to redux
      isInitialized: false,
    };
  }

  componentDidMount() {
    const { API_HOST, API_VERSION, API_KEY } = window.APP_CONFIG;
    const requestUrl = `${API_HOST}/${API_VERSION}/configuration?api_key=${API_KEY}`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem('TMDB_CONFIG', JSON.stringify(response));
        this.setState({ isInitialized: true });
      });
  }

  render() {
    const { isNavigationVisible, toggleNavVisibility } = this.props;
    return (
      <div className={styles.app}>
        <Header handleNavigationClick={toggleNavVisibility} />
        {isNavigationVisible && <Navigation />}
        <Main>
          {this.state.isInitialized ?
            <Switch>
              <Route path="/" exact component={NowPlaying} />
              <Route path="/popular" component={Popular} />
              <Route path="/top" component={TopRated} />
              <Route path="/upcoming" component={Upcoming} />
              <Route path="/search" component={SearchPage} />
              <Route component={NoMatch} />
            </Switch> :
            <div>Loading...</div>
          }
        </Main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  isNavigationVisible: PropTypes.bool.isRequired,
  toggleNavVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNavigationVisible: state.ui.isNavigationVisible,
});

const mapDispatchToProps = dispatch => ({
  toggleNavVisibility: () => dispatch(toggleNavigationVisibility()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
