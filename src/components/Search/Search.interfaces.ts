import { IMovie } from 'components/MoviesList'

export interface ISearchProps {
  isFetching: boolean;
  movies: IMovie[];
  searchMovies(query: string, page: number): void;
}

export interface ISearchState {
  lastSearchRequest: string;
}
