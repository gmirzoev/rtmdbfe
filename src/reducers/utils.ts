import { FULFILLED, PENDING, REJECTED } from 'redux-promise-middleware'

export function pending(actionType: string): string {
  return `${actionType}_${PENDING}`
}

export function fulfilled(actionType: string): string {
  return `${actionType}_${FULFILLED}`
}

export function rejected(actionType: string): string {
  return `${actionType}_${REJECTED}`
}
