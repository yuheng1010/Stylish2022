// connection configurations

const U = require('./user');
var cors = require('cors')
var mysql = require('mysql');
var express = require('express');
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './user/img');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage });
require('dotenv').config();
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
const { nodeName } = require('jquery');
app.use(cors())
app.use('/', express.static('.well-known'));
app.use('/',require('./check'));
app.use('/', U); //不知道為什麼家道user?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, defParamCharset: "utf8" }));
app.use('/admin', express.static('public'));
app.use('/', express.static('user'));

app.get('/', function (req, res) {
    return res.send('hello server');
});
app.listen(8000, function () {
    console.log('Node app is running on port 8000');
});

var dbConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

router.get('/products', function (req, res) {
    var all;
    dbConn.query('SELECT COUNT(*) AS num FROM products ', function (error, results, fields) {
        all = results[0].num;
    })
    var paging = req.query.paging;
    var allP;
  
    if (isNaN(paging) === false) {
        dbConn.query(`SELECT GROUP_CONCAT(DISTINCT(b.color)) as color,a.id,a.pname,a.pprice,a.categories,a.img,a.des_1,a.des_2 FROM inventory as b LEFT JOIN products as a ON a.id=b.p_ID GROUP BY b.p_ID Limit ${paging * 6},6`, function (error, results, fields) {
            if(parseInt(all)%6!==0){
                allP=Math.round(parseInt(all)/6);
            }else{
                allP=all;
            }
            if (error) throw error;
            if (paging * 6 + 6 < all) {
                res.set('Content-Type','application/json; charset=UTF-8');
                return res.send({
                    all_paging:allP,
                    next_paging: parseInt(paging) + 1,
                    list: JSON.stringify(results)
                })
            } else {
                return res.send({
                    next_paging:'none',
                    list: JSON.stringify(results)
                });
            }
        });
     }// else {
    //     res.send({'message':'input paging'})
    // }
});

router.get('/products/search', function (req, res) {
    var keyword = req.query.keyword;
    var paging = req.query.paging;
    if (keyword === undefined) {
        res.send('none');
    }
    console.log(keyword);
    if (isNaN(paging) === false) {
        var all;
        dbConn.query(`SELECT COUNT(*) AS num FROM products  WHERE pname LIKE ?`,'%'+keyword+'%', function (error, results, fields) {
            all = results[0].num;
        })
        
        dbConn.query(`SELECT GROUP_CONCAT(DISTINCT(b.color)) as color,a.id,a.pname,a.pprice,a.categories,a.img,a.des_1,a.des_2 FROM inventory as b LEFT JOIN products as a ON a.id=b.p_ID WHERE a.pname LIKE ? GROUP BY b.p_ID Limit ${paging * 6},6`,'%'+keyword+'%', function (error, results, fields) {
            if(parseInt(all)%6!==0){
                var allP=Math.round(parseInt(all)/6);
            }else{
                allP=all;
            }
            if (error) throw error;
            if (paging * 6 + 6 < all) {
                return res.send({
                    all_paging:allP,
                    next_paging: parseInt(paging) + 1,
                    list: JSON.stringify(results)
                })
            } else {
                return res.send({
                    
                    next_paging:'none',
                    list: JSON.stringify(results)
                });
            }

        });
    } else {
        dbConn.query(`SELECT * FROM products WHERE pname LIKE ?`,'%'+keyword+'%', function (error, results, fields) {
            if (error) throw error;
            return res.send(
                JSON.stringify(results)
            );
        })
    }
});

router.get('/products/details/:id', function (req, res) {
    var id = req.params.id;
    if (id === undefined) {
    }
    console.log(id);
    if (isNaN(id) === false) {
        dbConn.query('SELECT T2.id,T2.pname,T2.pprice,T2.img,T2.des_1,T2.des_2,T1.size,T1.num,T1.color,T1.imgs FROM stylish.inventory T1,products T2 WHERE T1.p_ID =? AND T2.id =?', [id, id], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                list:JSON.stringify(results)
            })
                
        });
    }
});


router.get('/products/cate',function(req,res){
    var cate = req.query.cate;
    var paging = req.query.paging;
    if (cate === undefined) {
        res.send('none');
    }
    console.log(cate);
    if (isNaN(paging) === false) {
        var all;
        dbConn.query('SELECT COUNT(*) AS num FROM products WHERE categories = ?', cate, function (error, results, fields) {
            all = results[0].num;
        })
        
        dbConn.query(`SELECT GROUP_CONCAT(distinct(b.color)) as color,a.id,a.pname,a.pprice,a.categories,a.img,a.des_1,a.des_2 FROM inventory as b LEFT JOIN products as a ON a.id=b.p_ID WHERE a.categories =? GROUP BY b.p_ID Limit ${paging * 6},6`,cate, function (error, results, fields) {
            console.log(all)
            if(parseInt(all)%6!==0){
                var allP=Math.ceil(parseInt(all)/6);
            }else{
                allP=all;
            }
            if (error) throw error;
            if (paging * 6 + 6 < all) {
                return res.send({
                    all_paging:allP,
                    next_paging: parseInt(paging) + 1,
                    list: JSON.stringify(results)
                })
            } else {
                return res.send({
                    next_paging:'none',
                    list: JSON.stringify(results)
                });
            }

        });
    } else {
        dbConn.query('SELECT * FROM products WHERE categories = ?',cate, function (error, results, fields) {
            if (error) throw error;
            return res.send(
                JSON.stringify(results)
            );
        })
    }
});
app.post('/upload', upload.single('img'), function (req, res, next) {
    var pID = req.body.pID;
    var pName = req.body.pName;
    var size = req.body.size;
    var num = req.body.num;
    var color = req.body.color;
    var des1 = req.body.des1;
    var des2 = req.body.des2;
    var category = req.body.pCategory;
    var price = req.body.pPrice;
    var url_ph = './img/' + (req.file.originalname).toString('utf8');

    dbConn.query('SELECT count(*) from products where id = ?', parseInt(pID), function (error, results, fields) {
        console.log(JSON.stringify(results));
        if (JSON.stringify(results) === '[{"count(*)":0}]') {
            dbConn.query('INSERT INTO products VALUES (?,?,?,?,?,?,?)', [parseInt(pID), pName, parseInt(price), category, url_ph, des1, des2], function (error, results, fields) {
                if (error) throw error;
            });
        } else {
            res.send('id is already exists.');
        }
        dbConn.query('INSERT INTO inventory(p_ID,size,num,color,imgs) VALUES (?,?,?,?,?)', [parseInt(pID), size, parseInt(num), color, url_ph], function (error, results, fields) {
            if (error) throw error;
            return res.send(
                'success'
            );
        });
    });
});

app.get('/getOrderData',function(req,res){
    dbConn.query('SELECT detail FROM `order`',function (error, results, fields) {
        res.send(JSON.stringify(results))
    })
})
app.use('/api/v1', router);
module.exports = app;