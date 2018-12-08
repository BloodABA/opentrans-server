const router = require('express').Router();
const DB_Projects = require('../models/projects');
const ABAFunc = require('../func');
create = async (req, res) => {
    const username = req.params.username;
    if(!req.body.project){
        res.send({
            status : false,
            message : "프로젝트명을 입력해주세요."
        })
        return;
    }
    if(!req.body.projectUrl){
        res.send({
            status : false,
            message : "URL을 입력해주세요."
        })
        return;
    }
    if(!req.body.description){
        res.send({
            status : false,
            message : "프로젝트에 대한 설명을 입력해주세요."
        })
        return;
    }
    if(!req.body.isOpensource){
        res.send({
            status : false,
            message : "오픈소스 여부를 체크해주세요."
        })
        return;
    }
    if(!req.body.src){
        res.send({
            status : false,
            message : "원문 언어를 선택해주세요."
        })
        return;
    }
    if(!req.body.dest){
        res.send({
            status : false,
            message : "어떤 언어로 번역할 지 선택해주세요."
        })
        return;
    }
    if(!req.body.bounty){
        res.send({
            status : false,
            message : "총 바운티를 입력해주세요."
        })
        return;
    }
    // if(!req.body.openTimestamp){
    //     res.send({
    //         status : false,
    //         message : "프로젝트 오픈 시간을 입력해주세요."
    //     })
    //     return;
    // }
    // if(!req.body.closeTimestamp){
    //     res.send({
    //         status : false,
    //         message : "프로젝트 마감 시간을 입력해주세요."
    //     })
    //     return;
    // }
    if(await ABAFunc.isExistProjectURL(req.body.projectUrl)) {
        res.send({
            status : false,
            message : "이미 존재하는 URL 입니다. 다시 시도해주세요"
        })
        return;
    }
    DB_Projects.create({
        project : req.body.project ,
        projectUrl : req.body.projectUrl ,
        owner : username ,
        description : req.body.description ,
        bounty : req.body.bounty ,
        src : req.body.src ,
        dest : req.body.dest ,
        visibility : req.body.visibility ,
        // openTimestamp : req.body.openTimestamp ,
        // closeTimestamp : req.body.closeTimestamp ,
        isOpensource : req.body.isOpensource
    }).then(result => {
        res.send({
            status : true,
            message : "프로젝트가 생성되었습니다."
        })
    }).catch(error => {
        console.error(error);
        res.send(500)
    })
    return;

}


//# 프로젝트 생성
router.get('/:username/create', create);

//# projectUrl에 해당하는 프로젝트 열람
router.get('/:projectUrl',projectUrl);

//# [보류] 프로젝트 수정
router.post('modify',modify);

//# [보류] 프로젝트 삭제 가능한지 체크
//# 완료조건1. 채택 대기 중 번역문장이 존재하지 않을 것.
//# 완료조건2. 번역이 진행된 문장에 대해 바운티가 모두 지급 되어있을 것.
router.post('colse',close);

//# 플랫폼 내 모든 프로젝트 리스트 호출
router.get('/',list);

module.exports = router;