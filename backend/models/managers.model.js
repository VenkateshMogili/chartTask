const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ManagerSchema = new Schema({
    name: {type: String, required: true,max: 100},
    email: {type: String, required: true},
    password: {type: String, required: true},
    usertype: {type: String, required: true}
});

module.exports = mongoose.model("Manager",ManagerSchema);