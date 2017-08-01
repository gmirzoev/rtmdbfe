import { GET_APP_CONFIG } from 'constants/actionTypes';
import { fetchJSON } from 'utils/utils';
import { toastr } from 'react-redux-toastr';

export const getAppConfig = () => {
  const { API_HOST, API_VERSION, API_KEY } = process.env.APP_CONFIG;
  const requestUrl = `${API_HOST}/${API_VERSION}/configuration?api_key=${API_KEY}`;

  return {
    type: GET_APP_CONFIG,
    payload: new Promise((resolve, reject) => {
      fetchJSON(requestUrl)
        .then(res => {
          process.env.TMDB_CONFIG = res;
          return resolve(res);
        })
        .catch(err => {
          if (err.status_message) {
            toastr.error('Error', err.status_message);
          }
          return reject(err.status_message);
        });
    }),
  };
};

export default getAppConfig;
