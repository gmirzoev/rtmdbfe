import * as React from 'react'
const styles = require('./MovieCard.scss')

interface IMovieCard {
  title: string
  poster: string
  overview: string
}

export default class MovieCard extends React.Component<IMovieCard> {
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
