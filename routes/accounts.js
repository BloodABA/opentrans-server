const DB_Accounts = require('../models/accounts');
const ABAFunc = require('../func');
const router = require('express').Router();

login = (req, res) => {
    
}

register = (req, res) => {
    req.body.fullname
    req.body.nickname
    req.body.email
    req.body.username
    req.body.password
    req.body.contract
}

find_username = (req, res) => {
}

find_password = (req, res) => {
    req.body.email
}

find_password_hash = (req, res) => {
}

profile = (req, res) => {
}

project = (req, res) => {
}

//# 로그인
router.get('/login', login);

//# 회원가입
router.get('/register', register);

//# 아이디 찾기
router.get('/find_username', find_username);

//# 비밀번호 찾기
router.get('/find_password', find_password);

//# 비밀번호 찾기 + 비밀번호 재설정
router.get('/find_password/<hash>', find_password_hash);

//# 프로필 ( 정보 열람 )
router.get('/profile/<username>', profile);

//# 프로젝트 리스트
router.get('/project/list/<username>', project);

module.exports = router;