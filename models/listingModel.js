const mongoose = require('mongoose');
const { Schema } = mongoose;
const {userModel} = require("./userModel")

const listingModel = new Schema({
    listedBy: userModel, // String is shorthand for {type: String}
    photo: String,
    name: String,
    artist: String,
    year: String,
    lastBid: String, //change to bid scheme
});

const Listings = mongoose.model("Listings", listingModel)
module.exports ={
    Listings, listingModel
}
