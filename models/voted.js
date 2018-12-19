const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // 프로젝트 ID
    project : {
        type : String,
        required : true
    },
    
    // TransLog Key
    transLogKey : {
        type : String,
        index : true,
        required : true
    },

    // Vote
    type : {
        type : Boolean,
        required : true
    },
    
    // Username
    username : {
        type : String,
        index : true,
        required : true
    },

});

// 검색을 위해 많은 양을 Index처리함
Database.index({
    project : 1,
    transLogKey : 1,
    username : 1
})

module.exports = mongoose.model('voteLog', Database);
