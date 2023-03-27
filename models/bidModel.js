const mongoose = require('mongoose');
const { Schema } = mongoose;
const {userModel} = require("./userModel")
const {listingModel} = require("./listingModel")

const bidsModel = new Schema({
    bidBy: userModel, // String is shorthand for {type: String}
    amount: Number,
    listing: listingModel,
    date:{type: Date ,Default:Date.now()}
});

const Bids = mongoose.model("Bids", bidsModel)
module.exports ={
    Bids, bidsModel
}
