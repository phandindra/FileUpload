const mongoose = require("mongoose");

require ("dotenv").config();

exports.connect =()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Db connection successfull"))
    .catch( (error)=>{
        console.log("DB connection Issue");
        console.error(error);
        process.exit(1);
    })
}