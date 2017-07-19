import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MoviesPagination from './MoviesPagination';
import MoviesList from './MoviesList';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.changePage(1);
  }

  changePage(page) {
    this.props.getMovies(page);
    this.setState({ activePage: page });
  }

  render() {
    const movies = this.props.movies;
    const activePage = this.state.activePage;
    return (
      <div>
        <MoviesPagination
          pagesCount={movies.pages}
          activePage={activePage}
          onPageChange={this.changePage}
        />
        {movies.isFetching ?
          <div style={{ textAlign: 'center' }}>Loading...</div> :
          <MoviesList movies={movies.items} />
        }
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      overview: PropTypes.string.isRequired,
    })).isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired,
  getMovies: PropTypes.func.isRequired,
};

export default Movies;
