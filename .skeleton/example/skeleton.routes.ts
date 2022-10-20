import { Router } from 'express'
const router = Router()
import SkeletonController from './skeleton.controller'

router.post('/', SkeletonController.create)

router.get('/', SkeletonController.getAll)
router.get('/:id', SkeletonController.getOne)

router.put('/:id', SkeletonController.update)

router.delete('/:id', SkeletonController.delete)

export default router
