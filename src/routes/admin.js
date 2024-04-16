const path = require('path');

const testEJS = require('../controllers/admin/controllerAdmin');
const { registerPage, registerUser } = require('../controllers/register')
const { loginPage, loginUser } = require('../controllers/login')

const RouterAdmin = (router) =>
    router
        .get('/admin', testEJS)
        .get('/register', registerPage)
        .post('/register', registerUser)
        .get('/login', loginPage)
        .post('/login', loginUser)

module.exports = { RouterAdmin };