import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Header.scss';

const Header = ({ handleNavigationClick }) => (
  <header className={styles.header}>
    <span>RTMDBFE</span>
    <span
      role="button"
      tabIndex={0}
      onClick={handleNavigationClick}
      className={styles.headerNavigationBtn}
    />
  </header>
);

Header.propTypes = {
  handleNavigationClick: PropTypes.func.isRequired,
};

export default Header;