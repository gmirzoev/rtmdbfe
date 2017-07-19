import React from 'react';
import * as styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <span className={styles.poweredByText}>
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </span>
    <div className={styles.poweredByLogo} />
  </footer>
);

export default Footer;
