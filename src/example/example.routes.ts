import { Router } from 'express'
const router = Router()
import ExampleController from './example.controller'

router.post('/', ExampleController.create)

router.get('/', ExampleController.getAll)
router.get('/:id', ExampleController.getOne)

router.put('/:id', ExampleController.update)

router.delete('/:id', ExampleController.delete)

export default router
