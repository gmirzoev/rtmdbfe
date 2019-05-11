import { toastr } from 'react-redux-toastr'
import { Movies } from 'constants/actionTypes'
import { Utils } from 'utils'

export function fetchMovies(moviesListType: string, page: number = 1) {
  const requestUrl = Utils.createTmdbUrl(`/movie/${moviesListType}?page=${page}`)
  return {
    type: Movies.FETCH_MOVIES,
    async payload () {
      try {
        const res = await fetch(requestUrl)
        if (res.status < 200 || res.status >= 400) {
          throw new Error('Something went wrong while fetching movies')
        }
        const jsonRes = await res.json()
        return {
          movies: jsonRes.results,
          pages: jsonRes.total_pages
        }
      } catch (e) {
        toastr.error('Error', e.message)
        throw e
      }
    }
  }
}

export function searchMovies(query: string, page: number) {
  const requestUrl = Utils.createTmdbUrl(`/search/movie?query=${query}&page=${page}`)
  return {
    type: Movies.SEARCH_MOVIE,
    payload: async () => {
      try {
        const res = await fetch(requestUrl)
        if (res.status < 200 || res.status >= 400) {
          throw new Error('Something went wrong while fetching search')
        }
        const jsonRes = await res.json()
        return {
          movies: jsonRes.results,
          pages: jsonRes.total_pages
        }
      } catch (e) {
        toastr.error('Error', e.message)
        throw e
      }
    }
  }
}
