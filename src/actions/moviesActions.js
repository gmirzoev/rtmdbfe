import { GET_MOVIES } from 'constants/actionTypes';
import { createTmdbUrl } from 'utils/utils';

export default function getMovies(moviesListType, page = 1) {
  const requestUrl = createTmdbUrl(`/movie/${moviesListType}?page=${page}`);

  return {
    type: GET_MOVIES,
    payload: new Promise((resolve, reject) => fetch(requestUrl)
        .then(response => response.json()
          .then(r => {
            if (!response.ok) {
              reject(r.status_message);
            }
            resolve({ movies: r.results, pages: r.total_pages });
          }),
        ),
    ),
  };
}
