const express = require('express');
const { RouterAdmin } = require('./admin');
const { RouterBlog } = require('./blog');

let router = express.Router();

const initAPIRoute = async (app) => {
    RouterAdmin(router);
    RouterBlog(router);
    app.use('/', router);
};

module.exports = initAPIRoute;