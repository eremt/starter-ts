import SkeletonService, { Skeleton } from './skeleton.service'

describe('skeleton.service', () => {
  let resultGetAll: Skeleton[]
  let resultId: string
  let resultValue: string

  it('Is empty', async () => {
    resultGetAll = await SkeletonService.getAll()
    expect(resultGetAll.length).toBe(0)
  })

  it('Creates skeleton', async () => {
    const resultCreate = await SkeletonService.create({ value: 'An example' })
    expect(resultCreate.value).toBe('An example')
  })

  it('Is no longer empty', async () => {
    resultGetAll = await SkeletonService.getAll()
    resultId = resultGetAll[0].id
    resultValue = resultGetAll[0].value
    expect(resultGetAll.length).toBe(1)
  })

  it('Gets by ID', async () => {
    let resultGetOne = await SkeletonService.getOne(resultId)
    expect(resultGetOne.value).toBe('An example')
  })

  it('Updates by ID', async () => {
    const resultUpdate = await SkeletonService.update(resultId, { value: 'An updated example' })
    expect(resultUpdate.value).toBe('An updated example')
  })

  it('Deletes by ID', async () => {
    await SkeletonService.delete(resultId)

    resultGetAll = await SkeletonService.getAll()
    expect(resultGetAll.length).toBe(0)
  })
})
