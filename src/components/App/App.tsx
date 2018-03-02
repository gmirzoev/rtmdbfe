import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { IAppState } from 'reducers'
import asyncComponent from 'components/AsyncComponent'
import { IAppProps as IProps } from './types'

const AsyncAuth = asyncComponent(() => import(/* webpackChunkName: "auth" */ 'components/Auth'))
const AsyncPrivatePages = asyncComponent(() => import(/* webpackChunkName: "private" */ 'components/PrivatePages'))

class App extends React.Component<IProps> {
  render() {
    const { isRegistered } = this.props
    return (
      <Switch>
        <Route
          path="/auth"
          exact={true}
          component={() => {
            if (isRegistered) {
              return <Redirect to="/" />
            }
            return <AsyncAuth />
          }}
        />
        <Route
          component={() => {
            if (!isRegistered) {
              return <Redirect to="/auth" />
            }
            return <AsyncPrivatePages />
          }}
        />
      </Switch>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  isRegistered: !!state.auth.user,
})

export default connect(mapStateToProps)(App)
