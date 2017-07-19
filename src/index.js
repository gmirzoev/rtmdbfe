import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store/configureStore';
import Root from 'components/Root';
import 'styles/index.scss';

require('isomorphic-fetch');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .catch(err => {
      Error('Service worker registration failed, error:', err);
    });
}

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('app'),
);
