import app from './app'

// TODO: mount only in dev mode
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../swagger'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const HOST = '0.0.0.0'
const PORT = 3000
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})
