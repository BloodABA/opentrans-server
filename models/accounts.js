const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // 실명
    fullname: {
        type : String,
        required : true
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
        required : true
    }

});

Database.index({
    username : 1
})

module.exports = mongoose.model('Accounts', Database);
