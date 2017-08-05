import React from 'react';
import * as styles from './Main.scss';

const Main = ({ children }) => (
  <main className={styles.main}>
    <div className={styles.mainInnerWrapper}>
      {children}
    </div>
  </main>
);

export default Main;
