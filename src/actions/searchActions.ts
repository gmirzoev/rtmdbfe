import { SEARCH_MOVIE } from 'constants/actionTypes'
import { Utils } from 'utils'

export function searchMovies(query: string, page: number) {
  const requestUrl = Utils.createTmdbUrl(`/search/movie?query=${query}&page=${page}`)
  return {
    type: SEARCH_MOVIE,
    payload: async () => {
      try {
        const searchResponse = await fetch(requestUrl)
        if (!searchResponse.ok) {
          throw new Error('Something went wrong while fetching search')
        }
        const search = await searchResponse.json()
        return {
          movies: search.results,
          pages: search.total_pages
        }
      } catch (err) {
        return Utils.handleError(err.message)
      }
    }
  }
}
