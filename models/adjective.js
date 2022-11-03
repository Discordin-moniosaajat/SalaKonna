const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for adjective part of psedoname

const adjectiveSchema = new Schema ({
    name: {
        type: String,
        required: true
    }
});

const Adjective = mongoose.model('adjective', adjectiveSchema)
module.exports = Adjective;