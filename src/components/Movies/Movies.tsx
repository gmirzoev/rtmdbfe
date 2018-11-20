import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { getMovies } from 'actions/moviesActions'
import { IAppState } from 'reducers'
import MoviesPagination from 'components/MoviesPagination'
import MoviesList, { IMovie } from 'components/MoviesList'
import LoadingIndicator from 'components/LoadingIndicator'
import * as styles from './Movies.scss'

type IMoviesProps = {
  isFetching: boolean
  pagesCount: number
  movies: ReadonlyArray<IMovie>
  getMovies(type: string, page: number): void
} & RouteComponentProps<{type: string, page: string}>

export class Movies extends React.Component<IMoviesProps> {
  constructor(props: IMoviesProps) {
    super(props)
    this.changePage = this.changePage.bind(this)
  }

  componentDidMount() {
    const page = parseInt(this.props.match.params.page, 10) || 1
    this.props.getMovies(this.props.match.params.type, page)
  }

  componentDidUpdate (prevProps: IMoviesProps) {
    if (this.props.match.params.type !== prevProps.match.params.type ||
        this.props.match.params.page !== prevProps.match.params.page) {
      const page = parseInt(this.props.match.params.page, 10) || 1
      this.props.getMovies(this.props.match.params.type, page)
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
  isFetching: state.movies.isFetching,
  pagesCount: state.movies.pages,
  movies: state.movies.items
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMovies: (type: string, page: number) => { dispatch(getMovies(type, page)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
