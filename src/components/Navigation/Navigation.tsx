import * as React from 'react'
import * as classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { INavLink } from 'components/PrivatePagesLayout'
const styles = require('./Navigation.scss')

interface INavigationProps {
  isVisible: boolean
  links: INavLink[]
  onLogout(): void
}

export default class Navigation extends React.Component<INavigationProps> {
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
