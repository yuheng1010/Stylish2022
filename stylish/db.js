var mysql = require('mysql2/promise');

var pool  = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB

});
module.exports=pool;