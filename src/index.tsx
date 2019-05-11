import React from 'react'
import { render } from 'react-dom'
import { configureStore } from 'state'
import Root from 'components/Root'
import 'styles/index.scss'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('app')
)
