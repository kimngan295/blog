const path = require('path');
const express = require('express');
const { bodyParserMiddleware, bodyParserMiddlewareUrlencoded } = require('./middlewares/bodyParser');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const initAPIRoute = require('./routes/router');

dotenv.config()

const app = express()
const hostname = process.env.HOST_NAME || 'localhost'
const port = process.env.PORT || 3000

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
})

app.use(cookieparser())
app.use(bodyParserMiddleware)
app.use(bodyParserMiddlewareUrlencoded)

app.set("views", __dirname + '/views')
app.set('view engine', 'ejs')

//static express routes
app.use('/static', express.static(__dirname + '/public'))

// init api routes
initAPIRoute(app)

app.get('/', (req, res) => {
    res.end('<h1>Hello World!!</h1><hr>')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})