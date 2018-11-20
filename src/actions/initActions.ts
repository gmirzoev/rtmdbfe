import { Generic } from 'constants/actionTypes'
import { Utils } from 'utils'

export function getTmdbConfig() {
  const { API_HOST, API_VERSION, API_KEY } = Utils.getConfig().stand
  const requestUrl = `${API_HOST}/${API_VERSION}/configuration?api_key=${API_KEY}`
  return {
    type: Generic.FETCH_TMDB_CONF,
    payload: async () => {
      try {
        const tmdbCfgResponse = await fetch(requestUrl)
        if (!tmdbCfgResponse.ok) {
          throw new Error('Something went wrong while fetching tmdb config')
        }
        const tmdbCfg = await tmdbCfgResponse.json()
        window.__TMDB_CONFIG__ = tmdbCfg
        return null
      } catch (err) {
        return Utils.handleError(err.message)
      }
    }
  }
}
