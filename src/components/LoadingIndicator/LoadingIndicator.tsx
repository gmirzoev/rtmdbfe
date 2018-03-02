import * as React from 'react'
const styles = require('./LoadingIndicator.scss')

export default class LoadingIndicator extends React.Component {
  render() {
    return (
      <div className={styles.liWrapper}>
        <div className={styles.liBg} />
        <div className={styles.li} />
      </div>
    )
  }
}
