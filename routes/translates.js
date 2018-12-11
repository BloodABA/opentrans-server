const router = require('express').Router();
const ABAFunc = require('../func');
const DB_translate = require('../models/translate');
const DB_transLog = require('../models/transLog');

submit = async (req, res) => {
    username = req.session.username;
}
router.post('/submit', submit);

module.exports = router;


// 번역
// post번역 문장 제출 /translate/LogSubmit

// REQUEST
// TranslateKey : string
// Username : string
// Transe : string
// RESPONSE
// status : boolean
// message : string


// post번역 문장 삭제 /translate/LogDelete

// REQUEST
// TranslateKey : string
// Username : string
// RESPONSE
// status : boolean
// message : string


// post번역 문장 투표 /translate/LogVote

// REQUEST
// Username : string
// RESPONSE
// status : boolean
// message : string


// post관리자 채택 /translate/LogPickOut

// REQUEST
// Username : string
// RESPONSE
// status : boolean
// message : string


// post 번역 문장 검색 /translate/LogSearch

// REQUEST
// Transe : string
// RESPONSE
// status : boolean
// message : string