import React from 'react'
import LoadingIndicator from './LoadingIndicator'

interface IAsyncComponentState {
  loaded: boolean;
}

export default function asyncComponent<P = {}>(getComponent: Function) {
  return class AsyncComponent extends React.Component<P, IAsyncComponentState> {
    static component: React.ComponentClass<P> | null = null

    state = {
      loaded: false
    }

    async componentDidMount() {
      if (this.state.loaded) {
        return
      }
      getComponent()
        .then((module: { default: React.ComponentClass<P> }) => {
          AsyncComponent.component = module.default
          this.setState({ loaded: true })
        })
    }

    render() {
      if (this.state.loaded && AsyncComponent.component) {
        return <AsyncComponent.component {...this.props} />
      }
      return <LoadingIndicator />
    }
  }
}
