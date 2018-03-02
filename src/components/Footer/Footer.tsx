import * as React from 'react'
const styles = require('./Footer.scss')

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <span className={styles.poweredByText}>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </span>
        <div className={styles.poweredByLogo} />
      </footer>
    )
  }
}
