const App = {}

// 이메일 형식이 맞는지
// username 형식이 맞는지 ( a-z 0-9 - _ )

// username을 인자로 받아 정보를 리턴한다.
// 이미 존재하는 username인가?
// email을 인자로 받아 정보를 리턴한다. 
// 이미 존재하는 email인가?

// LINK 계정이 등록된 사용자인가?

// 한 사람의 프로젝트 목록을 가져온다

// 이미 존재하는 projectUrl 인가?
// bounty 금액이 올바른가?
// src -> dest 가 올바른가? ( 영어-영어 안됨 )

// objectID로 프로젝트 정보 가져오기
// projectUrl로 프로젝트 정보 가져오기

// 총 지급 보상 계산
// 바운티 계산
// 바운티 지급 

// 제출한 문장이 올바른가?
// translateKey가 올바른가?

// 투표한 사용자인가?
// 관리자인가?
// 삭제가능한가?

// Language 추가
// 프로젝트 허가


// to 에게 title, body를 보낸다.
App.sendMail = (to, title, body) => {
    return;
}

// 비밀번호 단방향 암호화
App.passwordHash = (password) => {
    return;
}

// 비밀번호 초기화 관련 암호화
App.passwordResetHash = (password) => {
    return;
}

// 올바른 LINK Blockchaoin Address인지 확인
App.isCorrectAddress = (address) => {
    
    return true;
}



module.exports = App