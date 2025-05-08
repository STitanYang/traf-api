import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import router from './router/router'
import {handleError} from './middleware/errorHandlerMiddleware'
const app = express()
const port = process.env.PORT || 9999


app.listen(port, () => {
    console.log('started...')
})

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
