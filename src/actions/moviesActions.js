import { GET_MOVIES } from 'constants/actionTypes';
import { createTmdbUrl, fetchJSON } from 'utils/utils';
import { toastr } from 'react-redux-toastr';

export default function getMovies(moviesListType, page = 1) {
  const requestUrl = createTmdbUrl(`/movie/${moviesListType}?page=${page}`);

  return {
    type: GET_MOVIES,
    payload: new Promise((resolve, reject) => fetchJSON(requestUrl)
        .then(res => resolve({ movies: res.results, pages: res.total_pages }))
        .catch(err => {
          toastr.error('Error', err.status_message);
          return reject(err.status_message);
        }),
    ),
  };
}
