const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resterauntsSchema = new Schema({
    cusine: String,
    borough: String,
    address:{
        street: String,
        city: String,
        state: String,
        zipcode: String
    },
    name: String
})

const resteraunts = monsgoose.moel
("resteraunts", resterauntSchema);

module.exports = resteraunts;
