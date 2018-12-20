var express = require('express')
var app = express()
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var JEnum = require('./enum')

const session = require('express-session');

app.use(bodyParser.json({limit: '1024mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '1024mb', extended: true }));

app.all('/*', function(req, res, next) {
    console.log("[ " + req.method + " ] " + req.path)
    res.set('access-control-allow-origin', req.headers.origin);
	res.set('access-control-allow-credentials', true);
	res.set('access-control-allow-headers', req.headers['access-control-request-headers']);
    res.set('access-control-allow-method', '*');
    // res.header('Access-Control-Allow-Origin', JEnum.client);
    // res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.all('/*', function(req, res, next) {
    var keys = [];
    keys = Object.keys(req.body);
    var flag = false;
    for(let i=0;i<keys.length;i++) {
        if(typeof req.body[keys[i]] !== 'string' && typeof req.body[keys[i]] !== 'number' && typeof req.body[keys[i]] !== 'boolean') {
            flag = true;
            break;
        }
    }
    if(flag) {
        res.send("Only String / Number / Boolean")
    }
    next();
});

app.use(session({
    secret : '!@#$IDISRNDASSETS!#$%',
    resave : false,
    saveUninitialized : true,
    cookie : { httpOnly : true, maxAge : 86400000} // maxAge in miliseconds.
}));


출처: http://code-daniel.tistory.com/135 [● Smart Programmer ● - "다니엘의 IT 도서관"]

app.all('/*', function(req, res, next) {
    let flag = false;
    req.session['isLogin'] = !!req.session['isLogin'];
    for(let i=0;i<JEnum.NonLoginPage.length;i++) {
        if(JEnum.NonLoginPage[i].regex.test(req.path)) {
            for (let j = 0; j < JEnum.NonLoginPage[i].method.length; j++) {
                if(req.method.toLocaleLowerCase() === JEnum.NonLoginPage[i].method[j].toLowerCase()) {
                    flag = true;
                }
            }
        }
    }
    if(flag || req.session['isLogin']) {
        next();
    } else {
        res.send({
            status : false,
            message : "로그인이 필요한 작업입니다."
        })
    }
});

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

// @PAGE : /project
// @description : 프로젝트
app.use("/project", require('./routes/projects'))

// @PAGE : /translate
// @description : 번역 관련
app.use("/translate", require('./routes/translates'))


/******** Page Routing END *****/

var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
})

