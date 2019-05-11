import { IAction } from 'state/actions/interfaces'

export type IPayload<A extends IAction> = (
  A['payload'] extends () => Promise<infer U> ? U :
  A['payload'] extends () => infer U ? U :
  A['payload']
)
