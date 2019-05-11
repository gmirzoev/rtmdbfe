import { Ui } from 'constants/actionTypes'

export function hideNavigation() {
  return { type: Ui.HIDE_NAVIGATION }
}

export function toggleNavigation() {
  return { type: Ui.TOGGLE_NAVIGATION }
}
