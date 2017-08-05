// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { multiClass } from 'utils/utils';
import * as styles from './Navigation.scss';

const Navigation = ({ isVisible, links, onLogout }: navigationProps) => (
  <nav
    className={multiClass(
      styles.nav,
      { clsName: styles.navActive, isActive: isVisible },
    )}
  >
    <div className={styles.navTitle}>Menu</div>
    {links.map(link => (
      <NavLink
        key={link.url}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
        exact
        to={link.url}
      >
        {link.title}
      </NavLink>
    ))}
    <a
      className={multiClass(styles.navLink, styles.navLogout)}
      onClick={onLogout}
      role="menuitem"
      tabIndex="0"
    >
      Logout
    </a>
  </nav>
);

export default Navigation;
