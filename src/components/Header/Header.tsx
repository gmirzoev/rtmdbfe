import * as React from 'react'
import * as classNames from 'classnames'
import { NavLink } from 'react-router-dom'
const styles = require('./Header.scss')

interface IHeaderProps {
  isNavigationVisible: boolean
  onNavigationBtnClick(): void
}

export default class Header extends React.Component<IHeaderProps> {
  render () {
    const { isNavigationVisible, onNavigationBtnClick } = this.props
    return (
      <header className={styles.header}>
        <NavLink
          className={styles.headerLogo}
          exact={true}
          to="/movies/now_playing"
        >
          RTMDBFE
        </NavLink>
        <div
          role="button"
          tabIndex={0}
          onClick={onNavigationBtnClick}
          className={classNames(
            'js-menu',
            styles.headerNavBtn,
            { [styles.headerNavBtnActive]: isNavigationVisible }
          )}
          aria-label="Navigation"
        >
          <span className={classNames(styles.headerNavBtnItem, styles.headerNavBtnItemOne)} />
          <span className={classNames(styles.headerNavBtnItem, styles.headerNavBtnItemTwo)} />
          <span className={classNames(styles.headerNavBtnItem, styles.headerNavBtnItemThree)} />
        </div>
      </header>
    )
  }
}
