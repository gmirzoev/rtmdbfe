/**
 * Adds API host, API version and API key to provided path
 * @param {string} path
 * @returns {string}
 */
export const createTmdbUrl = path => {
  const { API_HOST, API_VERSION, API_KEY } = window.APP_CONFIG;
  let url = `${API_HOST}/${API_VERSION}${path[0] === '/' ? '' : '/'}${path}`;
  if (path.includes('?')) {
    url += `&api_key=${API_KEY}`;
  } else {
    url += `?api_key=${API_KEY}`;
  }
  return url;
};

/**
 * Enforces that a function not be called again until a certain amount of time has passed without it being called
 * @param {function()} cb
 * @param {number} wait
 * @param {this} context
 * @returns {function()}
 */
export const debounce = (cb, wait = 100, context = this) => {
  let timeout = null;

  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb.apply(context, args), wait);
  };
};
