const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(cors())



app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();

var dbConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

app.post('/signU', checkDuplicateUsernameOrEmail = async (req, res, next) => {
    var uAc = req.body.uAc;
    var uPa = req.body.uPa;
    var phone = req.body.phone;
    var add = req.body.add;
    var name = req.body.name;
    uPa = bcrypt.hashSync(uPa, 10);
    console.log(req.body);

    dbConn.query('SELECT EXISTS (SELECT id FROM member WHERE account = ?)AS Output', uAc, function (error, results, fields) {
        if (results[0].Output === 1) {
            return res.status(400).send({message:"Failed! Username is already in use!"});
        } else {
            console.log(name);
            console.log(uAc);
            console.log(uPa);
            console.log(parseInt(phone));
            console.log(add);
            dbConn.query('INSERT INTO member(name,account,password,phone,address) VALUES (?,?,?,?,?)', [name, uAc, uPa, parseInt(phone), add], function (error, results, fields) {
                return res.send({message:'success!'});
            })
        }
    })
})
app.post('/signI', checkDuplicateUsernameOrEmail = async (req, res, next) => {
    var uAc = req.body.uAc;
    var uPa = req.body.uPa;

    dbConn.query('SELECT EXISTS (SELECT id FROM member WHERE account = ?)AS Output', uAc, function (error, results, fields) {
        if (results[0].Output === 0) {
            return res.status(400).send({message:"Failed! User account is not correct!"});
        } else {
            dbConn.query('SELECT a.*,b.detail,b.transaction_num FROM member AS a,`order` as b WHERE a.account = ? AND a.name=b.name', uAc, async function (error, results, fields) {
                if(results.length!=0){
                    const psR = bcrypt.compareSync(uPa, results[0].password);
                    if (!psR) {
                        res.send({message:"WRONG_PASSWORD"});
                    }
                    const payload = {
                        id: results[0].id,
                        username: results[0].name,
                        detail:results[0].detail,
                        t_id:results[0].transaction_num
                    };
                    const token = jwt.sign(payload, process.env.secretJWT, { expiresIn: 86400 });
                    return res.send({ message: "LOGIN_SUCCESSFULLY", token });
                }else{
                    dbConn.query('SELECT a.* FROM member AS a,`order` as b WHERE a.account = ?', uAc, async function (error, results, fields) {
                        const psR = bcrypt.compareSync(uPa, results[0].password);
                    if (!psR) {
                        res.send({message:"WRONG_PASSWORD"});
                    }
                    const payload = {
                        id: results[0].id,
                        username: results[0].name,
                        detail:'',
                        t_id:''
                    };
                    const token = jwt.sign(payload, process.env.secretJWT, { expiresIn: 86400 });
                    return res.send({ message: "LOGIN_SUCCESSFULLY", token });
                    })
                }
                
            });
        }

    })
});
app.get('/authJWT', function (req, res, next) {

    try {
        const token = req.header('Authorization').replace('Bearer', ' ');
        const decoded = jwt.verify(token, process.env.secretJWT);
        req.id = decoded.id;
        console.log(decoded.id);
        console.log(decoded);
        res.send({message:decoded});
        // dbConn.query('SELECT * FROM member WHERE id = ?', decoded.id, function (error, result, fields) {
        //     return res.send(result);
        // })

    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
})


module.exports = app;