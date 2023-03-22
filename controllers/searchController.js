const {Listings} = require("../models/listingModel")

 search = async (req,res) => {
    const listings =await Listings.find({})
    res.render('../views/listings.ejs', {Items:{listings}});
}
const listing = (req,res) => {
    const listingId = req.params.id
   // item = items.get(listingId)
    res.render('../views/listing.ejs', {Item:{listingId}});
}

const newListing = (req,res)=>{
    res.render("../views/newListing.ejs");
}
module.exports = {
    search,listing,newListing
}
