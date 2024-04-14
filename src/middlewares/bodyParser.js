const bodyParser = require("body-parser");

const bodyParserMiddleware = bodyParser.json();
const bodyParserMiddlewareUrlencoded = bodyParser.urlencoded({ extended: true });

module.exports = {
    bodyParserMiddleware,
    bodyParserMiddlewareUrlencoded
};

