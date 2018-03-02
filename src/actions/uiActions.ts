import {
  HIDE_NAVIGATION,
  TOGGLE_NAVIGATION
} from 'constants/actionTypes'

export function hideNavigation() {
  return { type: HIDE_NAVIGATION }
}

export function toggleNavigation() {
  return { type: TOGGLE_NAVIGATION }
}
