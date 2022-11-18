const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/codeial_db", (err) => {
    if (err){
        console.log(`Error connecting with database  ${err}`);
    } else{
        console.log("Successfully connected with the database");
    }
});