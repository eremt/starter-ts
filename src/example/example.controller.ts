import { Request, Response } from 'express'
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
   */
  static async create (req: Request, res: Response) {
    try {
      const { value } = req.body
      const example = await ExampleService.create({ value })

      res.json(example)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @openapi
   * /examples/{id}:
   *   get:
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
   */
  static async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const example = await ExampleService.getOne(id)

      if (!example) return res.status(404).json({ status: 404, message: `Example ${id} not found.` })

      res.json(example)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @openapi
   * /examples:
   *   get:
   *     description: Get all examples
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/examplesResponse'
   */
  static async getAll (req: Request, res: Response) {
    try {
      const examples = await ExampleService.getAll()

      res.json(examples)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @openapi
   * /examples/{id}:
   *   put:
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
   */
  static async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { value } = req.body
      const example = await ExampleService.update(id, { value })

      if (!example) return res.status(404).json({ status: 404, message: `Example ${id} not found.` })

      res.json(example)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @openapi
   * /examples/{id}:
   *   delete:
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
   */
  static async delete (req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await ExampleService.delete(id)

      if (!result) return res.status(404).json({ status: 404, message: `Example ${id} not found.` })

      res.status(204).end()
    } catch (e) {
      console.log(e)
    }
  }
}
