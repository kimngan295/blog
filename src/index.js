import express from 'express';
import { bodyParserMiddleware, bodyParserMiddlewareUrlencoded } from './middlewares/bodyParser.js';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import {initAPIRoute}  from './routes/routes.js';
import cors from 'cors';

dotenv.config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
console.log(JWT_SECRET_KEY)

const app = express()
const hostname = process.env.HOST_NAME || 'localhost'
const port = process.env.PORT || 3000

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
})

app.use(cookieparser())
app.use(bodyParserMiddleware)
app.use(bodyParserMiddlewareUrlencoded)

// init api routes
initAPIRoute(app)

app.get('/', (req, res) => {
    res.end('<h1>Hello World!!</h1><hr>')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})