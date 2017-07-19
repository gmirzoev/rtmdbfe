import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Main.scss';

const Main = ({ children }) => (
  <main className={styles.main}>
    <div className={styles.mainInnerWrapper}>
      {children}
    </div>
  </main>
);

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
