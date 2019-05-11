export interface IMovie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
}

export interface IMoviesListProps {
  movies: ReadonlyArray<IMovie>;
}
