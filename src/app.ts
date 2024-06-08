import express, { Application } from 'express'
import cors from 'cors'
import swaggerui from 'swagger-ui-express'
import YAML from 'yamljs'
import bodyParser from 'body-parser'

import { config } from 'dotenv'
import router from './routes/route'
const app: Application = express()
config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const user = YAML.load('src/app.yaml' )
app.use('/api', swaggerui.serve, swaggerui.setup(user ))

const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', router)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`)
})
