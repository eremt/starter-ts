import { Request, Response, NextFunction } from 'express'

export function log (...message: any[]) {
  console.log(...message)
}
export function logError (error: Error) {
  console.log(error.stack)
}
export function logJSON (json: object) {
  log(JSON.stringify(json, null, 2))
}

export function logRequests () {
  return function (req: Request, res: Response, next: NextFunction) {
    const { method, path } = req
    log(`${method}: ${path}`)

    const { body } = req
    if (Object.keys(body).length) {
      // TODO: redact sensitive data such as passwords
      logJSON(body)
    }

    next()
  }
}
