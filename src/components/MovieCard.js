// @flow
import React from 'react';
import * as styles from './MovieCard.scss';

const MovieCard = ({ title, poster, overview }: movieCardProps) => (
  <div className={styles.movieCard}>
    <div className={styles.movieCardWrapper}>
      <img
        className={styles.movieCardImage}
        src={poster}
        title={title}
        alt={title}
      />
      <div className={styles.movieCardInfo}>
        <h3>{title}</h3>
        <span>{overview}</span>
      </div>
    </div>
  </div>
);

export default MovieCard;
