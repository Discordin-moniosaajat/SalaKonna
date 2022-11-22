const dotenv = require("dotenv");
dotenv.config();

const Adjective = require ('./models/adjective');
const Substantive = require ('./models/substantive');

//database connection
const { connect, default: mongoose } = require("mongoose");
    mongoose.connect(process.env.DATABASETOKEN, {
    })
    .then(() => {
        console.log('Connected to the DB!');
    })
    .catch((err) => {
        console.log(err);
    });