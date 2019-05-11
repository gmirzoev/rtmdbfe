import { IAppState } from 'state'
import * as fromAuth from 'state/reducers/auth'
import * as fromInit from 'state/reducers/init'
import * as fromMovies from 'state/reducers/movies'
import * as fromSearch from 'state/reducers/search'
import * as fromUi from 'state/reducers/ui'

export function selectUser(state: IAppState) {
  return fromAuth.selectUser(state.auth)
}

export function selectAuthPending(state: IAppState) {
  return fromAuth.selectPending(state.auth)
}

export function selectInitialized(state: IAppState) {
  return fromInit.selectInitialized(state.init)
}

export function selectInitError(state: IAppState) {
  return fromInit.selectError(state.init)
}

export function selectNavigationVisible(state: IAppState) {
  return fromUi.selectNavigationVisible(state.ui)
}

export function selectMovies(state: IAppState) {
  return fromMovies.selectMovies(state.movies)
}

export function selectMoviesPages(state: IAppState) {
  return fromMovies.selectPages(state.movies)
}

export function selectMoviesFetching(state: IAppState) {
  return fromMovies.selectFetching(state.movies)
}

export function selectSearchMovies(state: IAppState) {
  return fromSearch.selectMovies(state.search)
}

export function selectSearchFetching(state: IAppState) {
  return fromSearch.selectFetching(state.search)
}
