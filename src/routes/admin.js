const path = require('path');

const testEJS = require('../controllers/admin/controllerAdmin');
const { registerPage, registerUser } = require('../controllers/register')

const RouterAdmin = (router) =>
    router
        .get('/admin', testEJS)
        .get('/register', registerPage)
        .post('/register', registerUser)

module.exports = { RouterAdmin };