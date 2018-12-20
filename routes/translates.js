const router = require('express').Router();
const ABAFunc = require('../func');
const DB_translate = require('../models/translate');
const DB_transLog = require('../models/transLog');
const DB_voted = require('../models/voted');
const Docs = require('../git')

submit = async (req, res) => {
    username = req.session.username;
}
router.post('/submit', submit);

module.exports = router;


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
    const transKey = tk
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
            DB_transLog.create({
                project: projectUrl,
                translateKey: transKey,
                owner: req.session.username,
                trans: tl
            }).then(() => {
                res.send({
                    status: true,
                    message: "Okay"
                })
                return;
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


// # post번역 문장 삭제 /translate/LogDelete

// REQUEST
// TranslateKey : string
// Username : string
// RESPONSE
// status : boolean
// message : string


// # post 번역 문장 투표 /translate/:projectUrl/vote
vote = (req, res) => {
    const projectUrl = req.params.projectUrl
    const tk = req.body.transLogKey
    const type = req.body.type
    const username = req.session.username
    DB_voted.findOne({
        username: username,
        transLogKey: tk
    }).then((row) => {
        if(row) {
            res.send({
                status: false,
                message: "이미 투표하셨습니다."
            })
            return;
        }
        DB_voted.create({
            project: projectUrl,
            transLogKey: tk,
            type: type, // false = 반대, true = 찬성
            username: username
        }).then(() => {
            if(type) {
                return DB_transLog.findByIdAndUpdate(
                    tk,
                    {
                        $inc: {
                            like : 1
                        }
                    }
                )
            } else {
                DB_transLog.findByIdAndUpdate(
                    tk,
                    {
                        $inc: {
                            dislike : 1
                        }
                    }
                )
                return;
            }
        }).then(()=> {
            res.send({
                status: true,
                message: "투표해주셔서 감사합니다."
            })
            return;
        })
    }).catch(e => {
        console.log(e);
        res.send({
            status: false,
            message: "알 수 없는 에러입니다."
        })
    });
}

getInfo = (req, res) => {
    const key = req.params.key
    DB_transLog.find({translateKey:key})
        .then((rows) => {
            if(!rows) {
                res.send({
                    status: false,
                    message: "존재하지 않는 데이터입니다."
                })
                return;
            }
            res.send({
                status: true,
                data: rows
            })
        })
}

getLogInfo = (req, res) => {
    const key = req.params.key
    DB_transLog.findById(key)
        .then((row) => {
            if(!row) {
                res.send({
                    status: false,
                    message: "존재하지 않는 데이터입니다."
                })
                return;
            }
            res.send({
                status: true,
                data: {
                    _id: row._id,
                    project: row.project,
                    translateKey: row.translateKey,
                    isAccept: row.isAccept,
                    isAccepted: row.isAccepted,
                    owner: row.owner,
                    trans: row.trans,
                    like: row.like,
                    dislike: row.dislike,
                    rate: row.like / (row.like + row.dislike) * 100
                }
            })
        })
}

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

//# POST 번역 문장 제출 /translate/:projectUrl/LogSubmit
router.post('/:projectUrl/LogSubmit', LogSubmit);

//# POST 번역 문장 투표 /translate/:projectUrl/vote
router.post('/:projectUrl/vote', vote);

//# GET 번역 문장 정보 /translate/:projectUrl
router.get('/:key', getInfo)

//# GET 번역 문장 정보 /translate/getLogInfo/:projectUrl
// router.get('/getLogInfo/:key', getLogInfo)
