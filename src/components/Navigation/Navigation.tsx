import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { INavigationProps as IProps } from './Navigation.interfaces'
import styles from './Navigation.scss'

export default class Navigation extends React.Component<IProps> {
  render() {
    const { isVisible, links, onLogout } = this.props
    return (
      <nav
        className={classNames(
          styles.nav,
          { [styles.navActive]: isVisible }
        )}
      >
        <div className={styles.navTitle}>Menu</div>
        {links.map(link => (
          <NavLink
            key={link.url}
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
            to={link.url}
          >
            {link.title}
          </NavLink>
        ))}
        <span className={styles.navStubItem} />
        <div
          className={classNames(styles.navLink, styles.navLogout)}
          onClick={onLogout}
          role="menuitem"
          tabIndex={0}
        >
          Logout
        </div>
      </nav>
    )
  }
}
