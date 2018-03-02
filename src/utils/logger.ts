// tslint:disable:no-any no-console

export default class Logger {
  public static log (data: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(data)
    }
  }

  public static warn (data: any) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(data)
    }
  }

  public static error (data: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error(data)
    }
  }
}
