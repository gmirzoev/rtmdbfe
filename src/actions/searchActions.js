import { SEARCH_MOVIE } from 'constants/actionTypes';
import { createTmdbUrl } from 'utils/utils';

export function searchMovies(query, page) {
  const requestUrl = createTmdbUrl(`/search/movie?query=${query}&page=${page}`);

  return {
    type: SEARCH_MOVIE,
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

export default searchMovies;
