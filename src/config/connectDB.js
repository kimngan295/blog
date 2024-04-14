/*
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    port: 3307
});

connection.connect(function(err){
    if(err) console.log('not success');
    else console.log('success');
});

module.exports = connection;
*/

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
})

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;