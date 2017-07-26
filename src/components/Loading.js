import React from 'react';
import * as styles from './Loading.scss';

const Loading = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loader} />
  </div>
);

export default Loading;
