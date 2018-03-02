import * as React from 'react'
const styles = require('./NoMatch.scss')

export default class NoMatch extends React.Component {
  render () {
    return (
      <div className={styles.noMatch}>
        <h1>Oops! No such page was found...</h1>
      </div>
    )
  }
}
