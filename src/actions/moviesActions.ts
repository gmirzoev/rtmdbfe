import { GET_MOVIES } from 'constants/actionTypes'
import { Utils } from 'utils'

export function getMovies(moviesListType: string, page: number = 1) {
  const requestUrl = Utils.createTmdbUrl(`/movie/${moviesListType}?page=${page}`)
  return {
    type: GET_MOVIES,
    payload: async () => {
      try {
        const moviesResponse = await fetch(requestUrl)
        if (!moviesResponse.ok) {
          throw new Error('Something went wrong while fetching movies')
        }
        const movies = await moviesResponse.json()
        return {
          movies: movies.results,
          pages: movies.total_pages
        }
      } catch (err) {
        return Utils.handleError(err.message)
      }
    }
  }
}
