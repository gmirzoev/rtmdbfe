// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'utils/utils';
import { searchMovies } from 'actions/searchActions';
import SearchBar from './SearchBar';
import MoviesList from './MoviesList';
import Loading from './Loading';

class SearchPage extends Component {
  state = {
    lastSearchRequest: '',
  };

  props: searchPageProps;

  handleSearchInputChange = ({ search }) => {
    if (this.state.lastSearchRequest === search) return;
    this.setState({ lastSearchRequest: search });
    this.props.searchMovies(search, 1);
  };

  handleSearchInputChangeDebounced = debounce(this.handleSearchInputChange, 800);

  render() {
    const { isFetching, items } = this.props.movies;
    if (isFetching) {
      return <Loading />;
    }
    return (
      <div>
        <SearchBar onSubmit={this.handleSearchInputChangeDebounced} />
        <MoviesList movies={items} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.search,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchMovies: (query, page) => dispatch(searchMovies(query, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
