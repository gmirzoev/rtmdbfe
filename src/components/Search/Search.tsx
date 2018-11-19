import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Utils } from 'utils'
import { searchMovies } from 'actions/searchActions'
import { IAppState } from 'reducers'
import MoviesList, { IMovie } from 'components/MoviesList'
import LoadingIndicator from 'components/LoadingIndicator'
import SearchForm from './SearchForm'

interface ISearchProps {
  isFetching: boolean
  movies: IMovie[]
  searchMovies(query: string, page: number): void
}

interface ISearchState {
  lastSearchRequest: string
}

class Search extends React.Component<ISearchProps, ISearchState> {
  state = {
    lastSearchRequest: ''
  }

  constructor (props: ISearchProps) {
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
  isFetching: state.search.isFetching,
  movies: state.search.items
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchMovies: (query: string, page: number) => { dispatch(searchMovies(query, page)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
