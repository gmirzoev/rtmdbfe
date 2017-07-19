import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Navigation.scss';

const Navigation = () => (
  <nav className={styles.nav}>
    <ul className={styles.navItems}>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          exact
          to="/"
        >
          Now playing
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          exact
          to="/popular"
        >
          Popular
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          exact
          to="/top"
        >
          Top rated
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          exact
          to="/upcoming"
        >
          Upcoming
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          exact
          to="/search"
        >
          Search
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
