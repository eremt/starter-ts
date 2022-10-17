import { randomUUID } from 'crypto'

export interface Example {
  id?: string
  value: string
}
interface Examples {
  [key: string]: Example
}

const examples: Examples = {}

export default class ExampleService {
  static async create (example: Example) {
    try {
      const id = randomUUID()
      const result = { id, ...example }
      examples[id] = result

      return result
    } catch (e) {
      console.log(e)
    }
  }

  static async getOne (id: string) {
    try {
      const result = { ...examples[id] }
      if (!Object.keys(result).length) return null

      return result
    } catch (e) {
      console.log(e)
    }
  }

  static async getAll () {
    try {
      const result = Object.values(examples)
      return result
    } catch (e) {
      console.log(e)
    }
  }

  static async update (id: string, example: Example) {
    try {
      const result = { ...examples[id] }
      if (!Object.keys(result).length) return null

      const updated = { ...result, ...example }
      examples[id] = { ...updated }

      return updated
    } catch (e) {
      console.log(e)
    }
  }

  static async delete (id: string) {
    try {
      const result = { ...examples[id] }
      if (!Object.keys(result).length) return null

      delete examples[id]
      return true
    } catch (e) {
      console.log(e)
    }
  }
}
