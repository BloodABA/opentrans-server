const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // 프로젝트 이름
    project : {
        type : String,
        required : true
    },

    // 프로젝트 URL, 소문자-숫자
    projectUrl : {
        type : String,
        required : true,
        unique : true,
        index : true,
    },

    // 프로젝트 주인 username
    owner : {
        type : String,
        required : true,
        index : true
    },

    // 프로젝트 설명
    description : {
        type : String,
        required : true
    },

    // 총 바운티 금액
    bounty : {
        type : Number,
        required : true
    },

    // 출발 언어
    src : {
        type : Number,
        required : true,
        index : 1 
    },

    // 목적어 언어
    dest : {
        type : Number,
        required : true,
        index : 1 
    },

    // 가시성 ( True = Public, False = Private)
    visibility : {
        type : Boolean,
        index : true,
        default : true
    }
    

});

// 검색을 위해 많은 양을 Index처리함
Database.index({
    projectUrl : 1,
    src : 1,
    dst : 1,
    owner : 1,
    visibility : 1
})

module.exports = mongoose.model('Projects', Database);
