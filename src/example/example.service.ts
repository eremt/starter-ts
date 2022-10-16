interface Example {
  id?: number
  value: string
}

const examples: Example[] = []

export default class ExampleService {
  static async create (example: Example) {
    try {
      const ex = { id: examples.length, ...example }
      examples.push(ex)
      return example
    } catch (e) {
      console.log(e)
    }
  }

  static async getOne (id: number) {
    try {
      const index = examples.findIndex(e => e.id === id)

      return examples[index]
    } catch (e) {
      console.log(e)
    }
  }

  static async getAll () {
    try {
      return examples
    } catch (e) {
      console.log(e)
    }
  }

  static async update (id:number, example: Example) {
    try {
      const index = examples.findIndex(e => e.id === id)
      if (!examples[index]) return null

      const updated = { ...examples[index], ...example }
      examples[index] = updated

      return examples[index]
    } catch (e) {
      console.log(e)
    }
  }

  static async delete (id: number) {
    try {
      const index = examples.findIndex(e => e.id === id)
      if (!examples[index]) return null

      examples.splice(index, 1)
      return true
    } catch (e) {
      console.log(e)
    }
  }
}
