// @flow
import React, { Component } from 'react';
import MoviesPagination from './MoviesPagination';
import MoviesList from './MoviesList';
import Loading from './Loading';
import * as styles from './Movies.scss';

class Movies extends Component {
  state = {
    activePage: 1,
  };

  componentDidMount() {
    this.changePage(1);
  }

  props: moviesPagesProps;

  changePage = (page: number) => {
    this.props.getMovies(page);
    this.setState({ activePage: page });
  };

  render() {
    const movies = this.props.movies;
    const activePage = this.state.activePage;
    return (
      <div className={styles.movies}>
        <MoviesPagination
          pagesCount={movies.pages}
          activePage={activePage}
          onPageChange={this.changePage}
        />
        {movies.isFetching ?
          <Loading /> :
          <MoviesList movies={movies.items} />
        }
      </div>
    );
  }
}

export default Movies;
