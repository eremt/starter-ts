import app from './app'

const HOST = '0.0.0.0'
const PORT = 3000
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})
