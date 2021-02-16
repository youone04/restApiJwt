const mysql = require('mysql');

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if(err) throw err;
    console.log('database connect');
})

module.exports = connection;