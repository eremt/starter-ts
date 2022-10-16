import express from 'express'
const app = express()

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import router from './routes'
app.use(router)

app.get('/', (req, res) => res.json({ status: 200, message: 'Hello world' }))

export default app
