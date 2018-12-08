const DB_Accounts = require('../models/accounts');
const router = require('express').Router();

login = (req, res) => {
}

register = (req, res) => {   
}

find_username = (req, res) => {   
}

find_password = (req, res) => {   
}

find_password_hash = (req, res) => {   
}

profile = (req, res) => {   
}

project = (req, res) => {   
}

//# 로그인
router.get('/login', login(req, res));

//# 회원가입
router.get('/register', register(req, res));

//# 아이디 찾기
router.get('/find_username', find_username(req, res));

//# 비밀번호 찾기
router.get('/find_password', find_password(req, res));

//# 비밀번호 찾기 + 비밀번호 재설정
router.get('/find_password/<hash>', find_password_hash(req, res));

//# 프로필 ( 정보 열람 )
router.get('/profile/<username>', profile(req, res));

//# 프로젝트 리스트
router.get('/project/list/<username>', project(req, res));

module.exports = router;