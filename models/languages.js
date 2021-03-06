const mongoose = require('mongoose');

const Database = new mongoose.Schema({

    // language
    language : {
        type : String,
        unique : 1,
        index : 1,
        required : 1
    }

});

Database.index({
    language : 1
})

module.exports = mongoose.model('language', Database);
