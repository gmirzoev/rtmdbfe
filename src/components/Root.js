import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Router>
        <Route path="/" component={App} />
      </Router>
      <ReduxToastr
        timeOut={5000}
        newestOnTop
        preventDuplicates
        position="top-right"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
      />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
};

export default Root;
