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
        required : true
    },

    // Dislike
    dislike : {
        type : Number,
        required : true
    },

});

// 검색을 위해 많은 양을 Index처리함
Database.index({
    project : 1,
    owner : 1,
    translateKey : 1
})

module.exports = mongoose.model('transLog', Database);
