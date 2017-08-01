// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Header.scss';

type headerProps = {
  handleNavigationClick: Function,
}

const Header = ({ handleNavigationClick }: headerProps) => (
  <header className={styles.header}>
    <NavLink
      className={styles.headerLogo}
      exact
      to="/now-playing"
    >
      RTMDBFE
    </NavLink>
    <span
      role="button"
      tabIndex={0}
      onClick={handleNavigationClick}
      className={styles.headerNavigationBtn}
      aria-label="Navigation"
    />
  </header>
);

export default Header;
