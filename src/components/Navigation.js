import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { multiClass } from 'utils/utils';
import * as styles from './Navigation.scss';

const Navigation = ({ isVisible }) => (
  <nav
    className={multiClass(
      styles.nav,
      { clsName: styles.navActive, isActive: isVisible },
    )}
  >
    <ul className={styles.navItems}>
      <li className={styles.navItem}>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          exact
          to="/now-playing"
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

Navigation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Navigation;
