import { Router } from 'express'
const router = Router()

import ExampleRoutes from './example/example.routes'
router.use('/example', ExampleRoutes)

export default router
