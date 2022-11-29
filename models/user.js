const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for user
const userSchema = new Schema ({
    uid: {
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
    },
    
}, {timestamps: true})

const Userfile = mongoose.model('userfile', userSchema)
module.exports = Userfile;