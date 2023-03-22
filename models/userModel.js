const mongoose = require('mongoose');
const { Schema } = mongoose;

const userModel = new Schema({
    userName: String, // String is shorthand for {type: String}
    userId: String,
    userPhoto: String,
    Sells: Array,
    Orders: Array,
    Location: String,
    passwordHash: String
});

const Users = mongoose.model("Users", userModel)
module.exports ={
    Users,userModel
}