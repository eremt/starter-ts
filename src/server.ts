import app from './app'

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../swagger'
const { NODE_ENV } = process.env
if (NODE_ENV === 'development') {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

const HOST = process.env.HOST
const PORT = +process.env.PORT
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})
