import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'starter-ts',
      version: '0.0.1'
    }
  },
  apis: ['./src/**/*.controller.ts']
}

export default swaggerJsdoc(options)
