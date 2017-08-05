// @flow
import React, { Component } from 'react';
import Loading from './Loading';

export default function asyncComponent(getComponent: Function, props?: Object) {
  return class AsyncComponent extends Component {
    state = {
      loaded: false,
    };

    componentWillMount() {
      if (this.state.loaded) return;
      getComponent()
        .then(module => {
          this.component = module.default;
          this.setState({ loaded: true });
        });
    }

    component = null;

    render() {
      if (this.state.loaded) {
        return <this.component {...props} />;
      }
      return <Loading />;
    }
  };
}
