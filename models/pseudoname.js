const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for pseudoname
//Just a sketch atm
const pseudonameSchema = new Schema ({
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

const Pseudoname = mongoose.model('Pseudoname', pseudonameSchema)
module.exports = Pseudoname;