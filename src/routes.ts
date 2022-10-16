import { Router } from 'express'
const router = Router()

import ExampleRoutes from './example/example.routes'
router.use('/examples', ExampleRoutes)

export default router
