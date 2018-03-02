import * as React from 'react'
import { Provider, Store } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import App from 'components/App'

interface IRootProps {
  store: Store<object|undefined>
}

export default class Root extends React.Component<IRootProps> {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <React.Fragment>
          <Router>
            <Route path="/" component={App} />
          </Router>
          <ReduxToastr
            timeOut={5000}
            newestOnTop={true}
            preventDuplicates={true}
            position="top-right"
            transitionIn="bounceIn"
            transitionOut="bounceOut"
          />
        </React.Fragment>
      </Provider>
    )
  }
}
