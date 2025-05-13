import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({path: __dirname + `/../.env`})
import router from './router/router'
import {handleError} from './middleware/errorHandlerMiddleware'
import cookie from 'cookie-parser'
const app = express()
const port = process.env.PORT || 9999


app.listen(port, () => {
    console.log('started...')
})
//TODO: setup cors from env var
app.use(cookie())
app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(router, handleError)
app.listen(port, async() => {
    console.log('listening on port', port)
})
