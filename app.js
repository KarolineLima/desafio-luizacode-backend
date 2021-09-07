require('dotenv/config');

const express = require('express')
var cors = require('cors')

const app = express()
const port = 3080

app.use(cors())

app.get('/', (req, res) => {
  res.send({
      message: "hello I'm the backend"
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})