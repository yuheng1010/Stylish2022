const axios = require('axios')
var mysql = require('mysql');
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'stylish'
});

axios.get('http://35.75.145.100:1234/api/1.0/order/data').then((response)=>{
   console.log(response.data.length)
        console.log(123)
        for(var i=0;i<response.data.length;i++){
            const r = JSON.stringify(response.data[i])
            dbConn.query('INSERT INTO `order`(detail) VALUES (?)',[r],function (error, results, fields){

            })
        }    
})



