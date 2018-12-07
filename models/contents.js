const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    pk : {
        type : Number,
        required : true,
        unique : true,
        index : true
    },
    id : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    media_type : {
        type : Number,
        index : true
    },
    like_count : {
        type : Number,
        index : true
    },
    comment_count : {
        type : Number,
        index : true
    },
    owner : mongoose.Schema.Types.Mixed,
    data : mongoose.Schema.Types.Mixed
});

Database.index({
    pk : 1,
    id : 1,
    media_type : 1,
    like_count : 1,
    comment_count : 1
})

module.exports = mongoose.model('Contents', Database);
