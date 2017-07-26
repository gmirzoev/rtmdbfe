import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store/configureStore';
import Root from 'components/Root';
import 'styles/index.scss';

require('isomorphic-fetch');

// Service workers initialization
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .catch(err => Error('Service worker registration failed, error:', err));
}

// Demo users for login page
localStorage.setItem('users', JSON.stringify([
  { name: 'John', role: 'user', login: 'john', password: 123 },
  { name: 'Kate', role: 'user', login: 'kate', password: 456 },
  { name: 'Monty', role: 'admin', login: 'monty', password: 321 },
]));

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('app'),
);
