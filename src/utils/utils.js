/**
 * Adds API host, API version and API key to provided path
 * @param {string} path
 * @returns {string}
 */
export const createTmdbUrl = path => {
  const { API_HOST, API_VERSION, API_KEY } = process.env.APP_CONFIG;
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

/**
 * Converts fetched data to JSON.
 * Checks if authentication problems with requests exists. If yes - removes session data.
 * @param {string} url
 */
export const fetchJSON = url => fetch(url)
  .then(response => {
    if (response.status === 401 || response.status === 403) {
      // todo: logout and merge two checks
      return response.json()
        .then(err => {
          throw err;
        });
    }
    if (!response.ok) {
      return response.json()
        .then(err => {
          throw err;
        });
    }
    return response.json();
  });

/**
 * Converts passed data to string of classNames
 * @param {{clsName: string, isActive: boolean}|string} args
 * @returns {string}
 */
export const multiClass = (...args) => {
  const result = args.map(cls => {
    if (typeof cls === 'string') return cls;
    if (typeof cls === 'object') {
      const { clsName, isActive } = cls;
      if (isActive) return clsName;
    }
    return '';
  });
  return result.join(' ');
};
