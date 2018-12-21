const router = require('express').Router();
const DB_Projects = require('../models/projects');
const DB_Translate = require('../models/translate');
const ABAFunc = require('../func');
const Docs = require('../git')

create = async (req, res) => {

    console.log(req.body);

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
        owner : req.session.username,
        description : req.body.description,
        bounty : req.body.bounty,
        src : req.body.src,
        dest : req.body.dest,
        visibility : req.body.visibility,
        openTimestamp : req.body.openTimestamp,
        closeTimestamp : req.body.closeTimesstamp,
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

    var projectList = [];
    allProjectList.forEach(project => {
        projectList.push({
            owner : project.owner,//string
            projectUrl : project.projectUrl,//string
            project : project.project,//string
            description : project.description,//string
            bounty : project.bounty,//integer
            src : project.src,//string
            dest : project.dest,//string
            openstamp : project.openstamp,//integer
            closestamp : project.closestamp,//integer
            isOpensource : project.isOpensource,//boolean
            progress : project.progress,//number
            visiblity : project.visiblity//boolean
        })
    });

    res.send({
        status : true,
        data : projectList
    })

    return;
}
 
modify = async (req, res) => {
    const projectUrl = req.params.projectUrl;
    projInfo = await ABAFunc.getProjectInformation(projectUrl);

    if(!projInfo){
        res.send({
            status : false,
            message : "존재하지 않는 프로젝트 주소입니다."
        })
        return;
    }

    //프로젝트 소유자만 프로젝트 수정 가능
    if(req.session.username !== projInfo.owner){
        res.send({
            status : false,
            message : "프로젝트 소유자가 아닙니다."
        })
        return;
    }
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

    DB_Projects.update(
        { projectUrl : req.body.projectUrl },
        {
            // $set을 붙이지 않으면 명시된 필드 제외 다 초기화됨
            $set:{ 
                project : req.body.project,
                projectUrl : req.body.projectUrl,
                owner : req.session.username,
                description : req.body.description,
                bounty : req.body.bounty,
                src : req.body.src,
                dest : req.body.dest,
                visibility : req.body.visibility,
                openTimestamp : req.body.openTimestamp,
                closeTimestamp : req.body.closeTimestamp,
                isOpensource : req.body.isOpensource
            }
        },
        //여러 필드를 한번에 수정할 때
        { multi : true }
    ).then(result => {
        res.send({
            status : true,
            message : "프로젝트가 수정되었습니다."
        })
    }).catch(error => {
        console.error(error);
        res.send(500)
    })
    return;

}

docsApply = (req, res) => {

    if(!req.body.gitUrl) {
        res.send({
            status: false,
            message: "Git URL이 입력되지 않았습니다."
        })
        return;
    }

    var docs = Docs.docsDownload(req.params.projectUrl, req.body.gitUrl);
    if(docs === false) {
        res.send({
            status: false,
            message: "이미 다운로드했습니다. 새로운 버전으로 업데이트 하시려면 '업데이트'를 해주세요."
        })
        return;
    }


    docs.then(() => {
        return transUpdate(projectUrl)
    }).then(() => {
        res.send({
            status: true,
            message: "문서 업로드를 성공하였습니다."
        })
    })
    
    return;
}

async function transUpdate(projectUrl) {
    const files = Docs.docsMDList(projectUrl);
    for (let i = 0; i < files.length; i++) {
        const arr = []
        const file = files[i];
        const texts = Docs.docKeyRead(projectUrl, file.md5)

        start = (new Date()).getTime();
        const rows = await DB_Translate.find({ docKey: file.md5 }).exec()
        console.log(" > " + i + ". " + ((new Date()).getTime() - start))
        try {

            for(let j=0;j<texts.length;j++) {
                const text = texts[j];
                    if(!text.text) continue;
                    const key = text.key
                    let flag = false;
                    for(let k=0;k<arr.length;k++) {
                        if(key === arr[k].key) {
                            flag = true;
                            break;
                        }
                    }
                    for(let k=0;k<arr.length;k++) {
                        if(key === arr[k].key) {
                            flag = true;
                            break;
                        }
                    }
                    if(flag) continue;
                    arr.push({
                        project: projectUrl,
                        isTrans: false,
                        docKey: file.md5,
                        key: key,
                        src: text.text,
                        dest: "",
                        owner: "",
                        voteRate: 0,
                        acceptTransLog: "",
                        acceptTime: -1
                    })
            }
            // console.log("arr : " + arr.length)
            await DB_Translate.insertMany(arr)
        } catch (error) {
            console.log(error)
        }
    }
}

docsUpdate = (req, res) => {

    const projectUrl = req.params.projectUrl;

    var docs = Docs.docsPull(projectUrl);
    if(docs === false) {
        res.send({
            status: false,
            message: "오류가 발생하였습니다."
        })
        return;
    }

    docs.then(() => {
        return transUpdate(projectUrl)
    }).then(() => {
        res.send({
            status: true,
            message: "문서를 최신으로 업데이트하였습니다."
        })
        return;
    })

    return;
}


docsRead = (req, res) => {
    console.log(req.params.fileHash)
    if (!req.params.fileHash || !req.params.projectUrl) {
        res.send({
            status: false,
            data: "오류가 발생하였습니다."
        })
        return;
    }

    const doc = Docs.docKeyRead(req.params.projectUrl, req.params.fileHash)

    if(doc === undefined) {
        res.send({
            status: false,
            data: "Markdown 파일이 아닙니다."
        })
    } else {
        res.send({
            status: true,
            data: doc
        })    
    }
    return;
}

docsList = (req, res) => {
    res.send({
        status : true,
        data : Docs.docsList(req.params.projectUrl)
    })
    return;
}


docsMDList = (req, res) => {
    res.send({
        status : true,
        data : Docs.docsMDList(req.params.projectUrl)
    })
    return;
}

//# 프로젝트 생성
router.post('/create', create);

//# projectUrl에 해당하는 프로젝트 열람
router.get('/:projectUrl', projectOpen);

//# 프로젝트 수정
router.post('/:projectUrl/modify', modify);

//# 문서 업로드 ( git )
router.post('/:projectUrl/docsApply', docsApply);

//# 문서 업데이트 ( git )
router.post('/:projectUrl/docsUpdate', docsUpdate);

//# 문서 목록 ( docs list )
router.get('/:projectUrl/list', docsList);

//# 문서 목록 ( docs list ) + md
router.get('/:projectUrl/list/md', docsMDList);

//# 문서 읽기 ( docs read )
router.get('/:projectUrl/:fileHash', docsRead);

//# [보류] 프로젝트 삭제 가능한지 체크
//# 완료조건1. 채택 대기 중 번역문장이 존재하지 않을 것.
//# 완료조건2. 번역이 진행된 문장에 대해 바운티가 모두 지급 되어있을 것.
// router.post('colse',close);

//# 플랫폼 내 모든 프로젝트 리스트 호출
router.get('/',getAllProjectList);

module.exports = router;