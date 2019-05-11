import React from 'react'
import { IMovieCardProps as IProps } from './MovieCard.interfaces'
import styles from './MovieCard.scss'

export default class MovieCard extends React.Component<IProps> {
  render () {
    const { title, poster, overview } = this.props
    return (
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
    )
  }
}
