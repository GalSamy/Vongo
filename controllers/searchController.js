const {Listings} = require("../models/listingModel")
const search = async (req,res) => {
    const listings =await Listings.find({})
    res.render('../views/listings.ejs', {Items:{listings}});
}
const listing =async (req,res) => {
    const listingId = req.params.id
    const l = await Listings.findOne({_id: listingId}).catch(() => {
        res.sendStatus(404)
    })
    const name = l.name.replace(/ /g,"%20")
    let Album = await fetch("https://api.deezer.com/search/album/?q=The%20Dark%20Side%20Of%20The%20Moon") // change listing scheme to include album Id of api!!
    Album = await Album.json()
    let Songs = await fetch(Album.data[0].tracklist)
    Songs = await Songs.json()
    let Genre = await fetch("https://api.deezer.com/genre/" + Album.data[0].genre_id)
    Genre = await Genre.json()
    res.render('../views/listing.ejs', {
        Item:l,
        Album: Album.data[0],
        Songs: Songs.data,
        Genre: Genre
    });
}

const newListing = (req,res)=>{
    res.render("../views/newListing.ejs");
}
module.exports = {
    search,listing,newListing
}
