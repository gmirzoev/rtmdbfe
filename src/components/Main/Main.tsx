import React from 'react'
import styles from './Main.scss'

export default class Main extends React.Component {
  render () {
    return (
      <main className={styles.main}>
        <div className={styles.mainInnerWrapper}>
          {this.props.children}
        </div>
      </main>
    )
  }
}
