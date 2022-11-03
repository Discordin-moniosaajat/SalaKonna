const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for substantive part of pseudoname

const substantiveSchema = new Schema ({
    name: {
        type: String,
        required: true
    }
});

const Substantive = mongoose.model('substantive', substantiveSchema)
module.exports = Substantive;