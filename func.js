const DB_Accounts = require('./models/accounts');
const DB_Projects = require('./models/projects');
const DB_Translate = require('./models/translate');
const DB_transLog = require('./models/transLog');
const DB_Voted = require('./models/voted');
const DB_language = require('./models/languages');

const nodemailer = require('nodemailer'); // for Email
const fs = require('fs'); // for Email info
const crypto = require("crypto"); // for 비밀번호 암호화
const ABAEnum = require("./enum");

const App = {}

// 이메일 형식이 맞는지
App.isValidEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// username 형식이 맞는지 ( a-z 0-9 - _ )
App.isValidUsername = (username) => {
    if(username.length < 5 || username.length > 20) {
        return false;
    }
    var re = /^[0-9a-zA-Z_-]+$/
    return re.test(username);    
}

// username을 인자로 받아 정보를 리턴한다.
// email을 인자로 받아 정보를 리턴한다. 
App.getUserInformation = async (search, type='username') => {
    if(type === 'email') {
        // email로 Search
        return await DB_Accounts.findOne({ email : search }).exec()
    } else {
        // username으로 Search
        return await DB_Accounts.findOne({ username : search }).exec()
    }
}

// 이미 존재하는 username인가?
App.isExistUsername = (username) => {
    return App.getProjectInformation(username, 'username') ? true : false;
}

// 이미 존재하는 email인가?
App.isExistEmail = (email) => {
    return App.getProjectInformation(email, 'email') ? true : false;
}

// LINK 지갑 주소가 등록된 사용자인가?
App.isRegLinkAddr = (username) => {
    return App.getUserInformation(username).address ? true : false;
}

// 한 사람의 프로젝트 목록을 가져온다
App.getProjectList = async (username) => {
    const transLogs = await DB_transLog.find({owner:username})
        .sort({
            project : 1,
        }).exec();
    const projects = [];
    let lastProject = "";
    for(let i=0;i<transLogs.length;i++) {
        if(lastProject !== transLogs[i].project) {
            projects.push(transLogs[i].project)
        }
    }
    return lastProject;
}

// projectUrl로 프로젝트 정보 가져오기
App.getProjectInformation = async (projectUrl) => {
    return await DB_Projects.findOne({
        projectUrl : projectUrl
    }).exec()
}

// 이미 존재하는 projectUrl 인가?
App.isExistProjectURL = async (projectUrl) => {
    return App.getProjectInformation(projectUrl) ? true : false
}

// bounty 금액이 올바른가?
App.isValidBounty = (bounty) => {

    if(bounty < ABAEnum.minBounty) {
        return false;
    }

    if(bounty > ABAEnum.maxBounty) {
        return false;
    }

    return true;
}

// src -> dest 가 올바른가? ( 영어-영어 안됨 )
App.isValidLanguage = async (src, dest) => {

    if(src === dest) {
        return false;
    }

    var src = await DB_language.findById(src).exec()
    var dest = await DB_language.findById(dest).exec()

    if(!src || !dest) return false;

    return true;    

}

// 총 지급 보상 계산
App.calcTotalBounty = (projectUrl) => {
    
}

// 바운티 계산
App.calcBounty = (projectUrl) => {
    
}

// 바운티 지급 
App.giveBounty = (projectUrl) => {
    
}

// 제출한 문장이 올바른가?
App.isValidSentence = (sentence) => {
    return !!sentence;
}

// translateKey로 Translate가져오기
App.getTranslate = (translateKey) => {
    
}

// translateKey가 올바른가?
App.isValidTranslateKey = (translateKey) => {
    return !!App.getTranslate(translateKey);
}

// 투표한 사용자인가?
App.isVotedUser = (username, transLogKey) => {
    
}

// 서비스 최고 관리자인가?
App.isSuperAdmin = (username) => {
    //
}

// 프로젝트가 Close 가능한 상태인가?
App.canCloseProject = async (projectUrl) => {
    // return await DB_Accounts.findOne({projectUrl : projectUrl});
    
}

// Language 추가
App.addLanguage = (language) => {
    DB_language.create({
        language : language
    })
}

// 프로젝트 생성 허가
App.projectAccept = (projectUrl) => {
    
}

// to 에게 title, body를 보낸다.
App.sendMail = (to, title, body) => {

    let emailInfo = [
        ABAEnum.gmailUsername,
        ABAEnum.gmailPassword
    ]

    let transporter = nodemailer.createTransport({
        service: 'naver',
        auth: {
            user: emailInfo[0],
            pass: emailInfo[1]
        }
    });
        
    let mailOptions = {    
        from: 'TranseOpen <ghsehr1@naver.com>',
        to: to,
        subject: title,
        text: body
    };
    
    transporter.sendMail(mailOptions, (error, info)=>{    
        if (error) {
            transporter.close();
            return error;
        }
        else {
            transporter.close();
            return ('Email sent! : ' + info.response);
        }
    });
    // return;
}

// 비밀번호 단방향 암호화
App.passwordHash = (password) => {
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");
    return hashPassword;
}

// 비밀번호 초기화 관련 암호화
App.passwordResetHash = () => {
    password = crypto.randomBytes(20).toString('hex');
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");
    return hashPassword;
}

// 올바른 LINK Blockchaoin Address인지 확인
App.isCorrectAddress = (address) => {
    
    return true;
}



module.exports = App