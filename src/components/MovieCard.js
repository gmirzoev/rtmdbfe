import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './MovieCard.scss';

const MovieCard = ({ title, poster, overview }) => (
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

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default MovieCard;
