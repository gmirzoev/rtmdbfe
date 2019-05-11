/* tslint:disable-next-line:no-any */
export interface IAction<T = string, P = any> {
  type: T
  payload: P
}
