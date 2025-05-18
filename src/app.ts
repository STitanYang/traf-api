import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({path: __dirname + `/../.env`})
import router from './router/router'
import {handleError} from './middleware/errorHandlerMiddleware'
import cookie from 'cookie-parser'
import { generateAdminAccount } from './util/initFunctions'
const app = express()
const port = process.env.API_PORT || 9999

const corsOption = {
    origin: process.env.CLIENT_HOST,
    credentials: true,
}
app.listen(port, () => {
    console.log('started...')
})
// generateAdminAccount(process.env.API_ADMIN_USERNAME||'admin', process.env.API_ADMIN_PASSWORD || 'password1')
//TODO: setup cors from env var
app.use(cookie())
app.use(cors(corsOption))
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
