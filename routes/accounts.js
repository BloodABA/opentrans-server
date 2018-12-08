const DB_Accounts = require('../models/accounts');
const router = require('express').Router();

//# 로그인
router.get('/login', login(req, res));

//# 회원가입
router.get('/register', login(req, res));

//# 아이디 찾기
router.get('/find_username', login(req, res));

//# 비밀번호 찾기
router.get('/find_password', login(req, res));

//# 비밀번호 찾기 + 비밀번호 재설정
router.get('/find_password/<hash>', login(req, res));

//# 프로필 ( 정보 열람 )
router.get('/profile/<username>', login(req, res));

//# 프로젝트 리스트
router.get('/project/list/<username>', login(req, res));


module.exports = router;