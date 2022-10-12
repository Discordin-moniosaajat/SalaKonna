const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for testing
//seems to work
const testSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    tdata: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Test = mongoose.model('Test', testSchema)
module.exports = Test;