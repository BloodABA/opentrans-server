const router = require('express').Router();
const ABAFunc = require('../func');
const DB_translate = require('../models/translate');
const DB_transLog = require('../models/transLog');
const Docs = require('../git')

submit = async (req, res) => {
    username = req.session.username;
}
router.post('/submit', submit);

module.exports = router;


// REQUEST
LogSubmit = (req, res) => {
    const projectUrl = req.params.projectUrl
    const docKey = req.body.docKey
    const tk = req.body.translateKey
    const tl = req.body.translate

    if(!projectUrl || !docKey || !tk || !tl) {
        res.send({
            status: false,
            message: "모든 항목을 채워주세요~"
        })
        return;
    }

    Docs.docKeyRead(projectUrl, docKey)
    const transKey = docKey + "|" + tk
    DB_translate.findOne({
        docKey: docKey,
        key: transKey
    })
        .then(row => {
            if(!row) {
                res.send({
                    status: false,
                    message: "에러가 발생하였습니다."
                })
                return;
            }
            if(row.isTrans) {
                res.send({
                    status: false,
                    message: "이미 다른 제안이 채택된 번역입니다."
                })
                return;
            }
            return DB_transLog.create({
                project: projectUrl,
                translateKey: transKey,
                owner: req.session.username,
                trans: tl
            })
        })
        .then(() => {
            res.send({
                status: true,
                message: "Okay"
            })
        })
        .catch(e => {
            console.log(e);
            res.send({
                status: false,
                message: "알 수 없는 에러입니다."
            })
        })
}
// TranslateKey : string
//// Username : string
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

//# post번역 문장 제출 /translate/:projectUrl/LogSubmit
router.post('/:projectUrl/LogSubmit', LogSubmit);
