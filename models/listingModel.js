const mongoose = require('mongoose');
const { Schema } = mongoose;
const {userModel} = require("./userModel")

const listingModel = new Schema({
    listedBy: userModel, // String is shorthand for {type: String}
    photo: String,
    albumId: String,
    name: String,
    lastBid: String, //change to bid scheme
    artist: String,
    release: String,
    Bids: Array
});

const Listings = mongoose.model("Listings", listingModel)
module.exports ={
    Listings, listingModel
}
