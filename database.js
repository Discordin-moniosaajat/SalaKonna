const dotenv = require("dotenv");
dotenv.config();

const Test = require('./models/test');
const Adjective = require ('./models/adjective');
const Substantive = require ('./models/substantive');

//database connection
const { connect, default: mongoose } = require("mongoose");
    mongoose.connect(process.env.DATABASETOKEN, {
    })
    .then( () => {
        console.log('Connected to the DB!');
    })
    .catch((err) => {
        console.log(err);
    });

/*mongoose and mongodb sandbox testing
//just ignore this

//create test and data

const handleNewTest = async () => {
        const test = await Test.create({
            title: 'new test',
            tdata: 'this is a test'
        });
        console.log(test);
};
handleNewTest();
*/