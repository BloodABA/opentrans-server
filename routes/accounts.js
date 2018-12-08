const DB_Accounts = require('../models/accounts');
const ABAFunc = require('../func');
const router = require('express').Router();

login = (req, res) => {

    let accounts = ABAFunc.getUserInformation(req.body.username);

    if(!accounts) {
        res.send({
            status : false,
            message : "존재하지 않는 아이디입니다."
        })
        return;
    }

    if(accounts.password === ABAFunc.passwordHash(req.body.password)) {
        res.send({
            status : true,
            message : "로그인 성공"
        })
        return;
    }

    res.send({
        status : false,
        message : "존재하지 않는 아이디입니다."
    })

    return;

}

register = async (req, res) => {

    if(!req.body.fullname) {
        res.send({
            status : false,
            message : "실명을 입력해주세요."
        })
        return;
    }
    
    if(!req.body.nickname) {
        res.send({
            status : false,
            message : "별명을 입력해주세요."
        })
        return;
    }

    if(!req.body.email) {
        res.send({
            status : false,
            message : "이메일을 작성해주세요."
        })
        return;
    }

    if(!req.body.username) {
        res.send({
            status : false,
            message : "Username을 입력해주세요."
        })
        return;
    }

    if(!req.body.password) {
        res.send({
            status : false,
            message : "Password가 입력되지 않았습니다."
        })
        return;
    }

    if(!req.body.contract || !ABAFunc.isCorrectAddress(req.body.contract)) {
        req.body.contract = "";
    }

    if(!ABAFunc.isValidEmail(req.body.email)) {
        res.send({
            status : false,
            message : "이메일 형식이 올바르지 않습니다."
        })
        return;
    }

    if(!ABAFunc.isValidUsername(req.body.username)) {
        res.send({
            status : false,
            message : "Username은 5~20자로 영어 소문자와 숫자, 하이픈(-), 언더바(_)만 사용가능합니다."
        })
        return;
    }

    if(await ABAFunc.isExistEmail(req.body.email)) {
        res.send({
            status : false,
            message : "이미 존재하는 이메일입니다."
        })
        return;
    }

    if(!await ABAFunc.isExistUsername(req.body.username)) {
        res.send({
            status : false,
            message : "이미 존재하는 Username 입니다."
        })
        return;
    }

    req.body.password = ABAFunc.passwordHash(req.body.password)

    DB_Accounts.create({
        fullname : req.body.fullname,
        nickname : req.body.nickname,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        biograph : "",
        address : req.body.contract,
    }).then(results => {
        res.send({
            status : true,
            message : "회원가입을 축하합니다."
        })
    }).catch(error => {
        console.error(error);
        res.send(500)
    })
    
    return;

}

find_username = (req, res) => {
    req.body.email
}

find_password = (req, res) => {
    req.body.email
}

find_password_hash = (req, res) => {
    req.body.password
    req.body.password_check
}

profile = (req, res) => {
}

project = (req, res) => {

}

//# 로그인
router.post('/login', login);

//# 회원가입
router.post('/register', register);

//# 아이디 찾기
router.post('/find_username', find_username);

//# 비밀번호 찾기
router.post('/find_password', find_password);

//# 비밀번호 찾기 + 비밀번호 재설정
router.post('/find_password/<hash>', find_password_hash);

//# 프로필 ( 정보 열람 )
router.get('/<username>', profile);

//# 프로젝트 리스트
router.get('/<username>/project', project);

module.exports = router;