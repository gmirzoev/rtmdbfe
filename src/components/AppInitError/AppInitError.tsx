import * as React from 'react'
const styles = require('./AppInitError.scss')

export default class AppInitError extends React.Component {
  render() {
    return (
      <div className={styles.initError}>
        <div className={styles.initErrorText}>
          An error has occurred during application initialization.
        </div>
        <div className={styles.initErrorText}>
          Please, check your internet connection and try to refresh the page.
        </div>
      </div>
    )
  }
}
