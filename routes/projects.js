const router = require('express').Router();
const DB_Projects = require('../models/projects');
const ABAFunc = require('../func');
create = async (req, res) => {

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
        project : req.body.project,
        projectUrl : req.body.projectUrl,
        owner : 'song-c-o',
        description : req.body.description,
        bounty : req.body.bounty,
        src : req.body.src,
        dest : req.body.dest,
        visibility : req.body.visibility,
        openTimestamp : req.body.openTimestamp,
        closeTimestamp : req.body.closeTimestamp,
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

projectOpen = async (req, res) => {
    const projectUrl = req.params.projectUrl;
    projInfo = await ABAFunc.getProjectInformation(projectUrl);

    if(!projInfo){
        res.send({
            status : false,
            message : "존재하지 않는 프로젝트 주소입니다."
        })
        return;
    }
    
    res.send({
        status : true,
        data:{
            _id : projInfo._id,
            project : projInfo.project,
            projectUrl : projInfo.projectUrl,
            owner : projInfo.owner,            
            description : projInfo.description,
            bounty : projInfo.bounty,
            src : projInfo.src,
            dest : projInfo.dest,
            visiblity : projInfo.visiblity,
            isOpensource : projInfo.isOpensource,
            openTimestamp : projInfo.openTimestamp,
            closeTimestamp : projInfo.closeTimestamp,
            progress : 50 //원래는 투표율 계산해야함. 기능 미구현으로 인한 임시값 50 입력
        }
    })
    return;
}

getAllProjectList = async (req,res) => {
    const allProjectList = await ABAFunc.getAllProjectList()
    if(!allProjectList){
        res.send({
            status : false,
            message : "생성된 프로젝트가 없습니다."
        })
        return;
    }

    var projectList = new Array();
    // for(var projectList in allProjectList){
    allProjectList.forEach(project => {
        projectList.push(project)
    });
    res.send({
        status : true,
        data : {
            test:projectList,
            _id : projectList._id,//string
            owner : projectList.owner,//string
            projectUrl : projectList.projectUrl,//string
            project : projectList.project,//string
            description : projectList.description,//string
            bounty : projectList.bounty,//integer
            src : projectList.src,//string
            dest : projectList.dest,//string
            openstamp : projectList.openstamp,//integer
            closestamp : projectList.closestamp,//integer
            isOpensource : projectList.isOpensource,//boolean
            progress : projectList.progress,//number
            visiblity : projectList.visiblity//boolean
        }
    })
    return;
}
    
//# 프로젝트 생성
router.post('/create', create);

//# projectUrl에 해당하는 프로젝트 열람
router.get('/:projectUrl',projectOpen);

//# [보류] 프로젝트 수정
// router.post('modify',modify);

//# [보류] 프로젝트 삭제 가능한지 체크
//# 완료조건1. 채택 대기 중 번역문장이 존재하지 않을 것.
//# 완료조건2. 번역이 진행된 문장에 대해 바운티가 모두 지급 되어있을 것.
// router.post('colse',close);

//# 플랫폼 내 모든 프로젝트 리스트 호출
router.get('/',getAllProjectList);

module.exports = router;