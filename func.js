const DB_Accounts = require('./models/accounts');
const crypto = require("crypto"); // for 비밀번호 암호화

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
    return App.getProjectInformation(username, 'username');
}

// 이미 존재하는 email인가?
App.isExistEmail = (email) => {
    return App.getProjectInformation(email, 'email');
}

// LINK 지갑 주소가 등록된 사용자인가?
App.isRegLinkAddr = (username) => {

}

// 한 사람의 프로젝트 목록을 가져온다
App.getProjectList = (username) => {

}

// 이미 존재하는 projectUrl 인가?
App.isExistProjectURL = (projectUrl) => {

}

// bounty 금액이 올바른가?
App.isValidBounty = (bounty) => {

}

// src -> dest 가 올바른가? ( 영어-영어 안됨 )
App.isValidLanguage = (src, dest) => {
    
}

// projectUrl로 프로젝트 정보 가져오기
App.getProjectInformation = (projectUrl) => {
    
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
    
}

// translateKey가 올바른가?
App.isValidTranslateKey = (translateKey) => {
    
}

// 투표한 사용자인가?
App.isVotedUser = (username, transLogKey) => {
    
}

// 서비스 최고 관리자인가?
App.isSuperAdmin = (username) => {
    
}

// 프로젝트가 Close 가능한 상태인가?
App.canCloseProject = (projectUrl) => {
    
}

// 관리자가 Language 추가
App.addLanguage = (language) => {
    
}

// 관리자가 프로젝트 생성 허가
App.projectAccept = (projectUrl) => {
    
}


// to 에게 title, body를 보낸다.
App.sendMail = (to, title, body) => {
    return;
}

// 비밀번호 단방향 암호화
App.passwordHash = (password) => {
    //
    return "ASD";
}

// 비밀번호 초기화 관련 암호화
App.passwordResetHash = (password) => {
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");

    return hashPassword;
}

// 올바른 LINK Blockchaoin Address인지 확인
App.isCorrectAddress = (address) => {
    
    return true;
}



module.exports = App