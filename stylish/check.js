var express = require('express');
var cors = require('cors')
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
const axios = require('axios')
var mysql = require('mysql');
var app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
var dbConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});
app.post('/pay-by-prime', (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer', ' ');
        const decoded = jwt.verify(token, 'sleep');
        console.log(decoded)
        var prime = req.body.prime;
        var mail = req.body.mail;
        var name = req.body.name;
        var add = req.body.address;
        var time = req.body.time;
        var phone = req.body.phone;
        var detail = JSON.stringify(req.body.detail['detail']);
        console.log(detail)
        dbConn.query('INSERT INTO `order`(prime,`name`,detail,phone,address,`time`,`status`,mail) VALUES (?,?,?,?,?,?,?,?)', [prime, name, detail,phone, add, time, 0, mail], function (error, results, fields) {
            if (error) throw error;
            console.log('unpaid record');
        })
        const post_data = {
            "prime": req.body.prime,
            "partner_key": "partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG",
            "merchant_id": "AppWorksSchool_CTBC",
            "amount": 1,
            "currency": "TWD",
            "details": "buy some.",
            "cardholder": {
                "phone_number": req.body.phone,
                "name": req.body.name,
                "email": req.body.mail
            },
            "remember": false
        }

        axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
            headers: {
                'x-api-key': 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
            }
        }).then((response) => {
            console.log(response.data);
            var tNum = response.data.bank_transaction_id;
            var price = response.data.amount;
            if(response.data.status===0){
            dbConn.query('UPDATE `order` SET transaction_num=?,price=?,`status`=? WHERE prime=?', [tNum, parseInt(price), 1, prime], function (error, results, fields) {
                if (error) throw error;
                console.log('paid record');
            })
            return res.json({
                result: response.data
            })
        }})

    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }

})


module.exports = app;