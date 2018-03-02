// not that deep freeze in term of typings. Will fix with TS 2.8 and
// conditional types
declare module 'deep-freeze' {
  namespace deepFreeze {}
  function deepFreeze<T>(a: T[]): ReadonlyArray<T>
  function deepFreeze<T extends Function>(f: T): T
  function deepFreeze<T>(o: T): { readonly [P in keyof T]: T[P] }
  export = deepFreeze
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  __STAND_CONFIG__: IStandConfig
  __TMDB_CONFIG__: ITmdbConfig
}

interface IStandConfig {
  API_HOST: string
  API_VERSION: string
  API_KEY: string
}

interface ITmdbConfig {
  [key: string]: any
}

interface ICredentials {
  login: string
  password: string
}

interface IUser {
  login: string
  password: string
}

interface IAppConfig {
  stand: IStandConfig
  tmdb: ITmdbConfig
}
