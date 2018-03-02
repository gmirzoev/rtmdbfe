import * as React from 'react'
import LoadingIndicator from './LoadingIndicator'

interface IAsyncComponentProps {
  [key: string]: any // tslint:disable-line
}

interface IAsyncComponentState {
  loaded: boolean
}

export default function asyncComponent(getComponent: Function) {
  return class AsyncComponent extends React.Component<IAsyncComponentProps, IAsyncComponentState> {
    static component: React.ComponentClass|null = null

    state = {
      loaded: false
    }

    async componentWillMount() {
      if (this.state.loaded) {
        return
      }
      getComponent()
        .then((module: { default: React.ComponentClass }) => {
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
