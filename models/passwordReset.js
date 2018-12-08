const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    username: {
        type : String,
        required : true
    },

    hash : {
        type : String,
        required : true,
        unique : true
    },

    expire : {
        type : Number,
        required : true
    },

});

Database.index({
    username : 1
})

module.exports = mongoose.model('passwordReset', Database);
