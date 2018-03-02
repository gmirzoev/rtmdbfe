import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivatePagesLayout from 'components/PrivatePagesLayout'
import Movies from 'components/Movies'
import Search from 'components/Search'
import NoMatch from 'components/NoMatch'

export default class PrivatePages extends React.Component {
  render() {
    return (
      <PrivatePagesLayout>
        <Switch>
          <Route path="/movies/:type/:page?" component={Movies} />
          <Route path="/search" component={Search} />
          <Route
            path="/"
            exact={true}
            component={() => {
              return <Redirect to="/movies/now_playing" />
            }}
          />
          <Route component={NoMatch} />
        </Switch>
      </PrivatePagesLayout>
    )
  }
}
