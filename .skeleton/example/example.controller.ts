import { Request, Response } from 'express'
import { notFound, internalServerError } from '../utils/responses'
import ExampleService from './example.service'

/**
 * @openapi
 * components:
 *   exampleRequest:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *         example: An example
 *
 *   exampleResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       value:
 *         type: string
 *         example: An example
 *
 *   examplesResponse:
 *     type: array
 *     items:
 *       $ref: '#/components/exampleResponse'
 */
export default class ExampleController {
  /**
   * @openapi
   * /examples:
   *   post:
   *     tags: ['/example']
   *     description: Create example
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/exampleRequest'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/exampleResponse'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async create (req: Request, res: Response) {
    try {
      const { value } = req.body
      const example = await ExampleService.create({ value })

      res.json(example)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /examples/{id}:
   *   get:
   *     tags: ['/example']
   *     description: Get example by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/exampleResponse'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const example = await ExampleService.getOne(id)

      if (!example){
        const error = notFound(`Example ${id}`)
        return res.status(error.code).json(error)
      }

      res.json(example)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /examples:
   *   get:
   *     tags: ['/example']
   *     description: Get all examples
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/examplesResponse'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async getAll (req: Request, res: Response) {
    try {
      const examples = await ExampleService.getAll()

      res.json(examples)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /examples/{id}:
   *   put:
   *     tags: ['/example']
   *     description: Update example
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/exampleRequest'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/exampleResponse'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { value } = req.body
      const example = await ExampleService.update(id, { value })

      if (!example){
        const error = notFound(`Example ${id}`)
        return res.status(error.code).json(error)
      }

      res.json(example)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /examples/{id}:
   *   delete:
   *     tags: ['/example']
   *     description: Delete example
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *
   *     responses:
   *       204:
   *         description: Successful request
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async delete (req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await ExampleService.delete(id)

      if (!result){
        const error = notFound(`Example ${id}`)
        return res.status(error.code).json(error)
      }

      res.status(204).end()
    } catch (e) {
      internalServerError(e, req, res)
    }
  }
}
