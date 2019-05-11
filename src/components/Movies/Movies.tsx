import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IAppState } from 'state'
import { fetchMovies } from 'state/actions'
import { selectMoviesFetching, selectMoviesPages, selectMovies } from 'state/selectors'
import MoviesPagination from 'components/MoviesPagination'
import MoviesList from 'components/MoviesList'
import LoadingIndicator from 'components/LoadingIndicator'
import { IMoviesProps as IProps } from './Movies.interfaces'
import styles from './Movies.scss'

export class Movies extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    this.changePage = this.changePage.bind(this)
  }

  componentDidMount() {
    const page = parseInt(this.props.match.params.page, 10) || 1
    this.props.fetchMovies(this.props.match.params.type, page)
  }

  componentDidUpdate (prevProps: IProps) {
    if (this.props.match.params.type !== prevProps.match.params.type ||
        this.props.match.params.page !== prevProps.match.params.page) {
      const page = parseInt(this.props.match.params.page, 10) || 1
      this.props.fetchMovies(this.props.match.params.type, page)
    }
  }

  changePage(page: number) {
    this.props.history.push(`/movies/${this.props.match.params.type}/${page}`)
  }

  render() {
    const { isFetching, pagesCount, movies } = this.props
    const activePage = parseInt(this.props.match.params.page, 10) || 1
    return (
      <div className={styles.movies}>
        {isFetching ? <LoadingIndicator /> : null}
        <MoviesPagination
          pagesCount={pagesCount}
          activePage={activePage}
          onPageChange={this.changePage}
        />
        <MoviesList movies={movies} />
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  movies: selectMovies(state),
  pagesCount: selectMoviesPages(state),
  isFetching: selectMoviesFetching(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMovies: (type: string, page: number) => { dispatch(fetchMovies(type, page)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
