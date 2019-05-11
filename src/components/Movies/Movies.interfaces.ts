import { RouteComponentProps } from 'react-router-dom'
import { IMovie } from 'components/MoviesList'

export type IMoviesProps = {
  isFetching: boolean
  pagesCount: number
  movies: ReadonlyArray<IMovie>
  fetchMovies(type: string, page: number): void
} & RouteComponentProps<{type: string, page: string}>
