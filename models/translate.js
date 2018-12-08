const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // 프로젝트 ID
    project : {
        type : String,
        required : true,
        index : 1
    },

    // 번역 여부
    isTrans : {
        type : Boolean,
        default : false,
        index : 1,
        required : true
    },

    // 번역 전 문장
    source : {
        type : String,
        required : true
    },

    // 번역 후 문장
    dest : {
        type : String,
        default : "",
        required : true
    },

    // 채택 역자
    owner : {
        type : String,
        default : "",
        required : true
    },

    // 채택 비율
    voteRate : {
        type : Number,
        default : 0,
        required : true
    },

    // 채택된 transLog Key
    acceptTransLog : {
        type : String,
        default : "",
        required : false
    },

    // 채택 시간
    acceptTime : {
        type : Number,
        default : 0,
        required : true
    }


});

// 검색을 위해 많은 양을 Index처리함
Database.index({
    project : 1,
    isTrans : 1
})

module.exports = mongoose.model('translate', Database);
