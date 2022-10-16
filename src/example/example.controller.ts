import { Request, Response } from 'express'
import ExampleService from './example.service'

export default class ExampleController {
  static async create (req: Request, res: Response) {
    try {
      const { value } = req.body
      const example = await ExampleService.create({ value })

      res.json(example)
    } catch (e) {
      console.log(e)
    }
  }

  static async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const idNum = +id
      const example = await ExampleService.getOne(idNum)

      if (!example) return res.status(404).json({ status: 404, message: `Example ${id} not found.` })

      res.json(example)
    } catch (e) {
      console.log(e)
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      const examples = await ExampleService.getAll()

      res.json(examples)
    } catch (e) {
      console.log(e)
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const idNum = +id
      const { value } = req.body
      const example = await ExampleService.update(idNum, { value })

      if (!example) return res.status(404).json({ status: 404, message: `Example ${id} not found.` })

      res.json(example)
    } catch (e) {
      console.log(e)
    }
  }

  static async delete (req: Request, res: Response) {
    try {
      const { id } = req.params
      const idNum = +id
      const result = await ExampleService.delete(idNum)
      if (!result) return res.status(404).json({ status: 404, message: `Example ${id} not found.` })

      res.status(204).end()
    } catch (e) {
      console.log(e)
    }
  }
}
