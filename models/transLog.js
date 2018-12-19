const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // 프로젝트 ID
    project : {
        type : String,
        required : true
    },

    // 원본 키
    translateKey : {
        type : String,
        index : true,
        required : true
    },

    // 채택여부 (now)
    isAccept : {
        type : Boolean,
        default : false
    },

    // 한번이라도 채택이 된 적이 있는 경우
    isAccepted : {
        type : Boolean,
        default : false
    },

    // Owner
    owner : {
        type : String,
        index : true,
        required : true
    },

    // 번역 문장
    trans : {
        type : String,
        required : true
    },

    // Like
    like : {
        type : Number,
        default: 0
    },

    // Dislike
    dislike : {
        type : Number,
        default: 0
    },

});

// 검색을 위해 많은 양을 Index처리함
Database.index({
    project : 1,
    owner : 1,
    translateKey : 1
})

module.exports = mongoose.model('transLog', Database);
