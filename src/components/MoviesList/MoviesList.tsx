import React from 'react'
import { Utils } from 'utils'
import MovieCard from 'components/MovieCard'
import { IMoviesListProps as IProps } from './MoviesList.interfaces'

export default class MoviesList extends React.Component<IProps> {
  render() {
    const { secure_base_url: BASE_URL, poster_sizes } = Utils.getConfig().tmdb.images
    return (
      <div>
        {this.props.movies.map(movie => {
          const fullPosterPath = movie.poster_path
            ? `${BASE_URL}${poster_sizes[3]}${movie.poster_path}`
            : ''
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={fullPosterPath}
              overview={`${movie.overview.substr(0, 200)}...`}
            />
          )
        })}
      </div>
    )
  }
}
