const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model for pseudoname

const PseudonameSchema = new Schema ({
    name: {
        type: String,
        required: true
    }
})

const PseudonamePart1 = mongoose.model('Pseudoname1', pseudonameSchema)
module.exports = PseudonamePart1;