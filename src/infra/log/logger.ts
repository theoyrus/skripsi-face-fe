export interface LogFn {
  (message?: any, ...optionalParams: any[]): void
}

export interface ILogger {
  log: LogFn
  warn: LogFn
  error: LogFn
}

export type LogLevel = "log" | "warn" | "error"

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {}

export class ConsoleLogger implements ILogger {
  readonly log: LogFn
  readonly warn: LogFn
  readonly error: LogFn

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {}

    this.error = console.error.bind(console)

    if (level === "error") {
      this.warn = NO_OP
      this.log = NO_OP

      return
    }

    this.warn = console.warn.bind(console)

    if (level === "warn") {
      this.log = NO_OP

      return
    }

    this.log = console.log.bind(console)
  }
}

export const logger = new ConsoleLogger({
  level: import.meta.env.PROD ? "warn" : "log",
})
