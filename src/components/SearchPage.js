import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'utils/utils';
import { searchMovies } from 'actions/searchActions';
import SearchBar from './SearchBar';
import MoviesList from './MoviesList';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleSearchInputChange = debounce(this.handleSearchInputChange.bind(this), 800);
    this.state = {
      lastSearchRequest: '',
    };
  }

  handleSearchInputChange(values) {
    const { search } = values;

    if (this.state.lastSearchRequest === search) return;

    this.setState({ lastSearchRequest: search });
    this.props.searchMovies(search, 1);
  }

  render() {
    const movies = this.props.movies;
    return (
      <div>
        <SearchBar onSubmit={this.handleSearchInputChange} />
        <MoviesList movies={movies.items} />
      </div>
    );
  }
}

SearchPage.propTypes = {
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
  searchMovies: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  movies: state.search,
});

const mapDispatchToProps = dispatch => ({
  searchMovies: (query, page) => dispatch(searchMovies(query, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
