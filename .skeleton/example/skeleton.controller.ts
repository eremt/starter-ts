import { Request, Response } from 'express'
import { notFound, internalServerError } from '../utils/responses'
import SkeletonService from './skeleton.service'

/**
 * @openapi
 * components:
 *   skeletonRequest:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *         example: An example
 *
 *   skeletonResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       value:
 *         type: string
 *         example: An example
 *
 *   skeletonsResponse:
 *     type: array
 *     items:
 *       $ref: '#/components/skeletonResponse'
 */
export default class SkeletonController {
  /**
   * @openapi
   * /skeletons:
   *   post:
   *     tags: ['skeletons']
   *     summary: Create skeleton
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/skeletonRequest'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/skeletonResponse'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async create (req: Request, res: Response) {
    try {
      const { value } = req.body
      const skeleton = await SkeletonService.create({ value })

      res.json(skeleton)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /skeletons/{id}:
   *   get:
   *     tags: ['skeletons']
   *     summary: Get skeleton by id
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
   *               $ref: '#/components/skeletonResponse'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const skeleton = await SkeletonService.getOne(id)

      if (!skeleton){
        const error = notFound(`Skeleton ${id}`)
        return res.status(error.code).json(error)
      }

      res.json(skeleton)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /skeletons:
   *   get:
   *     tags: ['skeletons']
   *     summary: Get all skeletons
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/skeletonsResponse'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async getAll (req: Request, res: Response) {
    try {
      const skeletons = await SkeletonService.getAll()

      res.json(skeletons)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /skeletons/{id}:
   *   put:
   *     tags: ['skeletons']
   *     summary: Update skeleton
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
   *             $ref: '#/components/skeletonRequest'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/skeletonResponse'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { value } = req.body
      const skeleton = await SkeletonService.update(id, { value })

      if (!skeleton){
        const error = notFound(`Skeleton ${id}`)
        return res.status(error.code).json(error)
      }

      res.json(skeleton)
    } catch (e) {
      internalServerError(e, req, res)
    }
  }

  /**
   * @openapi
   * /skeletons/{id}:
   *   delete:
   *     tags: ['skeletons']
   *     summary: Delete skeleton
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
      const result = await SkeletonService.delete(id)

      if (!result){
        const error = notFound(`Skeleton ${id}`)
        return res.status(error.code).json(error)
      }

      res.status(204).end()
    } catch (e) {
      internalServerError(e, req, res)
    }
  }
}
