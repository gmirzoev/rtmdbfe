import { toastr } from 'react-redux-toastr'
import { Generic } from 'constants/actionTypes'
import { Utils } from 'utils'

export function getTmdbConfig() {
  const { API_HOST, API_VERSION, API_KEY } = Utils.getConfig().stand
  const requestUrl = `${API_HOST}/${API_VERSION}/configuration?api_key=${API_KEY}`
  return {
    type: Generic.FETCH_TMDB_CONF,
    async payload () {
      try {
        const res = await fetch(requestUrl)
        if (res.status < 200 || res.status >= 400) {
          throw new Error('Something went wrong while fetching tmdb config')
        }
        const tmdbCfg = await res.json()
        window.__TMDB_CONFIG__ = tmdbCfg
      } catch (e) {
        toastr.error('Error', e.message)
        throw e
      }
    }
  }
}
