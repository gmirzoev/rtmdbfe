import { ActionType } from 'redux-promise-middleware'

export function pending(actionType: string): string {
  return `${actionType}_${ActionType.Pending}`
}

export function fulfilled(actionType: string): string {
  return `${actionType}_${ActionType.Fulfilled}`
}

export function rejected(actionType: string): string {
  return `${actionType}_${ActionType.Rejected}`
}
