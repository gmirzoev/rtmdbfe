import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MoviesList = ({ movies }) => {
  const { secure_base_url: BASE_URL, poster_sizes } = process.env.TMDB_CONFIG.images;
  return (
    <div>
      {
        movies.map(movie => {
          const fullPosterPath = movie.poster_path ? `${BASE_URL}${poster_sizes[3]}${movie.poster_path}` : '';
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={fullPosterPath}
              overview={`${movie.overview.substr(0, 200)}...`}
            />
          );
        })
      }
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      overview: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MoviesList;
