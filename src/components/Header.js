// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { multiClass } from 'utils/utils';
import * as styles from './Header.scss';

const Header = ({ onNavigationBtnClick }: headerProps) => (
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
      onClick={onNavigationBtnClick}
      className={multiClass(styles.headerNavigationBtn, 'js-menu')}
      aria-label="Navigation"
    />
  </header>
);

export default Header;
