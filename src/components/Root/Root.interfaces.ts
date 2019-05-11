import { Store } from 'redux'
import { IAppState } from 'state'

export interface IRootProps {
  store: Store<IAppState>;
}
