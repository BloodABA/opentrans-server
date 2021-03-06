const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // 실명
    fullname: {
        type : String,
        required : true
    },

    // Nickname 
    nickname : {
        type : String,
        required : true
    },

    // 소개글
    biograph : {
        type : String,
        default : "",
    },

    // 이메일, Unique 해야함
    email: {
        type : String,
        unique : true,
        required : true
    },
    
    // Username ( 아이디 )
    username : {
        type : String,
        required : true,
        unique : true,
        index : true
    },

    // Password ( 비밀번호 )
    password : {
        type : String,
        required : true
    },

    // Contract 주소
    address: {
        type : String,
        default : ""
    },

    isAdmin: {
        type : Boolean,
        default : false
    }

});

Database.index({
    username : 1
})

module.exports = mongoose.model('Accounts', Database);
