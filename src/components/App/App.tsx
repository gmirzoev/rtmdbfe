import * as React from 'react'
import { connect } from 'react-redux'
import { boundMethod } from 'autobind-decorator'
import { Redirect, Route, Switch } from 'react-router-dom'
import { IAppState } from 'reducers'
import asyncComponent from 'components/AsyncComponent'

interface IAppProps {
  isRegistered: boolean;
}

class App extends React.Component<IAppProps> {
  private static AsyncAuth: React.ComponentClass
  private static AsyncPrivatePages: React.ComponentClass

  @boundMethod
  renderAuth () {
    const { isRegistered } = this.props
    if (isRegistered) {
      return <Redirect to="/" />
    }
    if (!App.AsyncAuth) {
      App.AsyncAuth = asyncComponent(() => {
        return import(/* webpackChunkName: "auth" */ 'components/Auth')
      })
    }
    return <App.AsyncAuth />
  }

  @boundMethod
  renderPrivate () {
    const { isRegistered } = this.props
    if (!isRegistered) {
      return <Redirect to="/auth" />
    }
    if (!App.AsyncPrivatePages) {
      App.AsyncPrivatePages = asyncComponent(() => {
        return import(/* webpackChunkName: "private" */ 'components/PrivatePages')
      })
    }
    return <App.AsyncPrivatePages />
  }

  render() {
    return (
      <Switch>
        <Route
          path="/auth"
          exact={true}
          component={this.renderAuth}
        />
        <Route
          path="/"
          component={this.renderPrivate}
        />
      </Switch>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  isRegistered: !!state.auth.user,
})

export default connect(mapStateToProps)(App)
