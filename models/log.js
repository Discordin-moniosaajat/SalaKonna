const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for log
//Just a sketch atm
const logSchema = new Schema ({
    user: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    }, message: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

const Logfile = mongoose.model('logfile', logSchema)
module.exports = Logfile;