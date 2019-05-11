import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Utils } from 'utils'
import { IAppState } from 'state'
import { searchMovies } from 'state/actions'
import { selectSearchMovies, selectSearchFetching } from 'state/selectors'
import MoviesList from 'components/MoviesList'
import LoadingIndicator from 'components/LoadingIndicator'
import SearchForm from './SearchForm'
import {
  ISearchProps as IProps,
  ISearchState as IState
} from './Search.interfaces'

class Search extends React.Component<IProps, IState> {
  state = {
    lastSearchRequest: ''
  }

  constructor (props: IProps) {
    super(props)
    this.handleSearchInputChange = Utils.debounce(this.handleSearchInputChange.bind(this), 800)
  }

  handleSearchInputChange({ search }: { search: string }) {
    if (this.state.lastSearchRequest === search) {
      return
    }
    this.setState({ lastSearchRequest: search })
    this.props.searchMovies(search, 1)
  }

  render() {
    const { isFetching, movies } = this.props
    return (
      <div>
        {isFetching ? <LoadingIndicator /> : null}
        <SearchForm
          initialValues={{ search: this.state.lastSearchRequest }}
          onSubmit={this.handleSearchInputChange}
        />
        <MoviesList movies={movies} />
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  movies: selectSearchMovies(state),
  isFetching: selectSearchFetching(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchMovies: (query: string, page: number) => { dispatch(searchMovies(query, page)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
