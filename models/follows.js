const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    hash : {
        type : String,
        required : true,
        unique : true,
        index : true
    },
    from : {
        type : Number,
        required : true,
        index : true
    },
    to : {
        type : Number,
        required : true,
        index : true
    },
    data : mongoose.Schema.Types.Mixed,
});

Database.index({
    hash : 1,
    from : 1,
    to : 1
})

module.exports = mongoose.model('Follows', Database);
