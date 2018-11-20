// tslint:disable:no-any
import { toastr } from 'react-redux-toastr'

export default class Utils {
  /* Returns application configuration data */
  public static getConfig(): IAppConfig {
    return {
      stand: window.__STAND_CONFIG__,
      tmdb: window.__TMDB_CONFIG__
    }
  }

  /* Error handling helper function */
  public static handleError(errMsg: string = 'Unknown error occured',
                            errTitle: string = ''): never {
    toastr.error(errTitle, errMsg)
    throw new Error(errMsg)
  }

  /* Adds hostname for provided path */
  public static createTmdbUrl(path: string): string {
    const { API_HOST, API_VERSION, API_KEY } = Utils.getConfig().stand
    let url = `${API_HOST}/${API_VERSION}${path[0] === '/' ? '' : '/'}${path}`
    if (path.includes('?')) {
      url += `&api_key=${API_KEY}`
    } else {
      url += `?api_key=${API_KEY}`
    }
    return url
  }

  /**
   * Ensures that provided callback will not be called again until a certain
   * amount of time has passed after previous call
   */
  public static debounce(cb: Function, delay: number = 100, context: any = null) {
    let timeoutId: number
    return function debounced(...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => cb.apply(context, args), delay)
    }
  }

  /* Wait helper function. Used mostly to simulate latency. */
  public static wait(ms: number = 0): Promise<undefined> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
