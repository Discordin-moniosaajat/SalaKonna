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

//mongoose and mongodb sandbox testing, adding testdata to DB

/*
//adjective testdata
const handleNewAdjective = async () => {
    const adjective = await Adjective.create({
        name: 'Black'
    });
    console.log(adjective);
};
handleNewAdjective();
*/

/*
//substantive testdata
const handleNewSubstantive = async () => {
    const substantive = await Substantive.create({
        name: 'Raccoon'
    });
    console.log(substantive);
};
handleNewSubstantive();
*/