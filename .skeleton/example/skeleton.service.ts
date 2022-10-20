import { randomUUID } from 'crypto'

export interface Skeleton {
  id?: string
  value: string
}
interface Skeletons {
  [key: string]: Skeleton
}

const skeletons: Skeletons = {}

export default class SkeletonService {
  static async create (skeleton: Skeleton) {
    try {
      const id = randomUUID()
      const result = { id, ...skeleton }
      skeletons[id] = result

      return result
    } catch (e) {
      console.log(e)
    }
  }

  static async getOne (id: string) {
    try {
      const result = { ...skeletons[id] }
      if (!Object.keys(result).length) return null

      return result
    } catch (e) {
      console.log(e)
    }
  }

  static async getAll () {
    try {
      const result = Object.values(skeletons)
      return result
    } catch (e) {
      console.log(e)
    }
  }

  static async update (id: string, skeleton: Skeleton) {
    try {
      const result = { ...skeletons[id] }
      if (!Object.keys(result).length) return null

      const updated = { ...result, ...skeleton }
      skeletons[id] = { ...updated }

      return updated
    } catch (e) {
      console.log(e)
    }
  }

  static async delete (id: string) {
    try {
      const result = { ...skeletons[id] }
      if (!Object.keys(result).length) return null

      delete skeletons[id]
      return true
    } catch (e) {
      console.log(e)
    }
  }
}
