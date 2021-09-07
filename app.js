require('dotenv/config');

const express = require('express')
var cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express()
const port = 3080

app.use(cors())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./src/routes')(app)

app.get('/', (req, res) => {
  res.send({
      message: "hello I'm the backend"
  })
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})