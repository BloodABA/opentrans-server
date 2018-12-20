const DB_Accounts = require('../models/accounts');
const DB_PasswordReset = require('../models/passwordReset');
const JEnum = require('../enum');
const ABAFunc = require('../func');
const router = require('express').Router();

//#################//
//##### LOGIN #####//
//#################//

login = async (req, res) => {

    let accounts = await ABAFunc.getUserInformation(req.body.username);

    if(!accounts) {
        res.send({
            status : false,
            message : "존재하지 않는 아이디입니다."
        })
        return;
    }

    if(accounts.password === ABAFunc.passwordHash(req.body.password)) {

        req.session['isLogin'] = true;
        req.session['username'] = accounts.username;
        req.session['isAdmin'] = accounts.isAdmin;

        res.send({
            status : true,
            message : "로그인 성공"
        })

        return;
    }

    res.send({
        status : false,
        message : "존재하지 않는 아이디입니다."
    })

    return;
}

//#################//
//##### REGIST ####//
//#################//

register = async (req, res) => {

    if(!req.body.fullname) {
        res.send({
            status : false,
            message : "실명을 입력해주세요."
        })
        return;
    }
    
    if(!req.body.nickname) {
        res.send({
            status : false,
            message : "별명을 입력해주세요."
        })
        return;
    }

    if(!req.body.email) {
        res.send({
            status : false,
            message : "이메일을 작성해주세요."
        })
        return;
    }

    if(!req.body.username) {
        res.send({
            status : false,
            message : "Username을 입력해주세요."
        })
        return;
    }

    if(!req.body.password) {
        res.send({
            status : false,
            message : "Password가 입력되지 않았습니다."
        })
        return;
    }

    if(!req.body.contract || !ABAFunc.isCorrectAddress(req.body.contract)) {
        req.body.contract = "";
    }

    if(!ABAFunc.isValidEmail(req.body.email)) {
        res.send({
            status : false,
            message : "이메일 형식이 올바르지 않습니다."
        })
        return;
    }

    if(!ABAFunc.isValidUsername(req.body.username)) {
        res.send({
            status : false,
            message : "Username은 5~20자로 영어 소문자와 숫자, 하이픈(-), 언더바(_)만 사용가능합니다."
        })
        return;
    }

    if(await ABAFunc.isExistEmail(req.body.email)) {
        res.send({
            status : false,
            message : "이미 존재하는 이메일입니다."
        })
        return;
    }

    if(!await ABAFunc.isExistUsername(req.body.username)) {
        res.send({
            status : false,
            message : "이미 존재하는 Username 입니다."
        })
        return;
    }

    req.body.password = ABAFunc.passwordHash(req.body.password)

    DB_Accounts.create({
        fullname : req.body.fullname,
        nickname : req.body.nickname,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        biograph : "",
        address : req.body.contract,
    }).then(results => {
        res.send({
            status : true,
            message : "회원가입을 축하합니다."
        })
    }).catch(error => {
        console.error(error);
        res.send(500)
    })

    return;

}

//#################//
//#FIND USERNAME ##//
//#################//

find_username = async (req, res) => {

    const account = await ABAFunc.getUserInformation(req.body.email, "email")

    if(!account) {
        res.send({
            status : false,
            message : "존재하지 않는 이메일입니다."
        })
        return;
    }

    res.send({
        status : true,
        message : "이메일로 username을 전송하였습니다."
    })

    ABAFunc.sendMail(account.email, "[OpenTrans] Username", "Your username is `" + account.username + "`");
    
}

find_password = async (req, res) => {

    const account = await ABAFunc.getUserInformation(req.body.email, "email")
    if(!account) {
        res.send({
            status : false,
            message : "존재하지 않는 이메일입니다."
        })
        return;
    }

    const username = account.username; // username
    const hash = ABAFunc.passwordResetHash(); // 랜덤 해시
    const expire = Date.now() + 1800 * 1000; // 30분

    DB_PasswordReset.create({
        username : username,
        hash : hash,
        expire : expire
    })

    const url = JEnum.domain + "/find_password/" + hash;
    
    res.send({
        status : true,
        message : "이메일로 비밀번호 초기화 페이지 주소를 전송하였습니다."
    })

    // 나중에 바꿀 것
    ABAFunc.sendMail(account.email, "[OpenTrans] Password Reset", "Password reset page is `" + url + "`");
}

find_password_hash = (req, res) => {

    if(!req.body.password) {
        res.send({
            status : false,
            message : "비밀번호를 입력해주세요."
        })
        return;
    }

    if(req.body.password !== req.body.password_check) {
        res.send({
            status : false,
            message : "입력하신 두 비밀번호가 서로 같지 않습니다."
        })
        return;
    }

    DB_PasswordReset.findOne({
        hash : req.params.hash
    }).then(result => {

        const username = result.username;
        req.body.password = ABAFunc.passwordHash(req.body.password);       
        DB_Accounts.updateOne({
                username : username
            }, {
                $set : {
                    password : req.body.password
                }
            }
        ).then(r => {
            res.send({
                status : true,
                message : "비밀번호 변경이 완료되었습니다."
            })
        })
        
    })

}

profile = async (req, res) => {

    const username = req.params.username;
    userInfo = await ABAFunc.getUserInformation(username)

    if(!userInfo){
        res.send({
            status : false,
            message : "존재하지 않는 username입니다."
        })
        return;
    }

    res.send({
        status : true,
        data :{
            nickname : userInfo.nickname,
            biograph : userInfo.biograph,
            username : userInfo.username,
            contract : userInfo.contract,
            heatmap : {}
        } 
    })
}

project = (req, res) => {
    const username = req.params.username;
    

}

//# 세션
router.post('/session', (req, res) => {
    if(req.session.isLogin) {
        res.send({
            status: true,
            username: req.session.username
        })
        return;
    }
    res.send({
        status: false,
    })
    return;
});

//# 로그인
router.post('/login', login);

//# 회원가입
router.post('/register', register);

//# 아이디 찾기
router.post('/find_username', find_username);

//# 비밀번호 찾기
router.post('/find_password', find_password);

//# 비밀번호 찾기 + 비밀번호 재설정
router.post('/find_password/:hash', find_password_hash);

//# 프로필 ( 정보 열람 )
router.get('/:username', profile);

//# 프로젝트 리스트
router.get('/:username/project', project);

module.exports = router;