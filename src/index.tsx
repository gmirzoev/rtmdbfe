import * as React from 'react'
import { render } from 'react-dom'
import configureStore from 'store/configureStore'
import Root from 'components/Root'
import 'styles/index.scss'

// Demo users for auth page
localStorage.setItem('users', JSON.stringify([
  { name: 'John', role: 'user', login: 'john', password: '123' },
  { name: 'Kate', role: 'user', login: 'kate', password: '456' },
  { name: 'Monty', role: 'admin', login: 'monty', password: '321' }
]))

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('app')
)
