import { Request, Response } from 'express'

interface ResponseError {
  code: number
  message: string
}

/**
 * @openapi
 * components:
 *   notFound:
 *     description: Not found
 *     content:
 *       application/json:
 *         schema:
 *           example:
 *             code: 404
 *             message: '[resource] not found.'
 */
export const NOT_FOUND: ResponseError = {
  code: 404,
  message: "Not found."
}
export function notFound (resource: string): ResponseError {
  return {
    code: NOT_FOUND.code,
    message: `${resource} not found.`
  }
}

/**
 * @openapi
 * components:
 *   internalServerError:
 *     description: Internal server error
 *     content:
 *       application/json:
 *         schema:
 *           example:
 *             code: 500
 *             message: Internal server error.
 */
export const INTERAL_SERVER_ERROR: ResponseError = {
  code: 500,
  message: "internal server error."
}
export function internalServerError (error: Error, req: Request, res: Response) {
  console.error(error.stack)
  res.status(INTERAL_SERVER_ERROR.code).json(INTERAL_SERVER_ERROR)
}
