var express = require('express')
var app = express()
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var JEnum = require('./enum')

const session = require('express-session');

app.use(bodyParser.json({limit: '1024mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '1024mb', extended: true }));

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', JEnum.client);
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.all('/*', function(req, res, next) {
    var keys = [];
    keys = Object.keys(req.body);
    var flag = false;
    for(let i=0;i<keys.length;i++) {
        if(typeof req.body[keys[i]] !== 'string') {
            flag = true;
        }
    }
    if(flag) {
        res.send("Only STRING")
    }
    next();
});

app.use(session({
    secret: 'Seesion_Scret_Code',
    resave: false,
    saveUninitialized: true
}));

port = JEnum.port

// Mongoose Promise
mongoose.Promise = global.Promise;

// MongoDB 연결소스
mongoose.connect(JEnum.mongo.url, {
        useNewUrlParser: true,
        // user : "",
        // pass : ""
    })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

/******** Page Routing *********/

// @PAGE : /
// @description : 기본 인덱스 페이지
app.use("/", require('./routes/index'))

// @PAGE : /accounts
// @description : 계정 관련 페이지
app.use("/account", require('./routes/accounts'))

/******** Page Routing END *****/

var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
})

