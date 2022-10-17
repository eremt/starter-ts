import ExampleService, { Example } from './example.service'

describe('example.service', () => {
  let resultGetAll: Example[]
  let resultId: string
  let resultValue: string

  it('Is empty', async () => {
    resultGetAll = await ExampleService.getAll()
    expect(resultGetAll.length).toBe(0)
  })

  it('Creates example', async () => {
    const resultCreate = await ExampleService.create({ value: 'An example' })
    expect(resultCreate.value).toBe('An example')
  })

  it('Is no longer empty', async () => {
    resultGetAll = await ExampleService.getAll()
    resultId = resultGetAll[0].id
    resultValue = resultGetAll[0].value
    expect(resultGetAll.length).toBe(1)
  })

  it('Gets by ID', async () => {
    let resultGetOne = await ExampleService.getOne(resultId)
    expect(resultGetOne.value).toBe('An example')
  })

  it('Updates by ID', async () => {
    const resultUpdate = await ExampleService.update(resultId, { value: 'An updated example' })
    expect(resultUpdate.value).toBe('An updated example')
  })

  it('Deletes by ID', async () => {
    await ExampleService.delete(resultId)

    resultGetAll = await ExampleService.getAll()
    expect(resultGetAll.length).toBe(0)
  })
})
