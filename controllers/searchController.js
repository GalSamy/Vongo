const {Listings} = require("../models/listingModel")

const postNewListing = async (req,res) =>{
    console.log(req.locals)
    if (req.locals.email === ""){
         return res.status(409).json({ message: "not logged in" });
    }
    if (!req.file || !req.body.bid || !req.body.albumId){
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    let album = await fetch("https://api.deezer.com/album/" + req.body.albumId)
    await album.json()
    if (album.error){
        return res.status(409).json({ message: "wrong album id" });
    }
    res.send({message:"success"})

}
const search = async (req,res) => {
    const listings =await Listings.find({})
    res.render('../views/listings.ejs', {Items:{listings},
    });
}
const listing =async (req,res) => {
    let er = false;
    const listingId = req.params.id
    const l = await Listings.findOne({_id: listingId}).catch(() => {
        er = true;
        res.status(404).send("Resource not found. Invalid ID")
    })
    if (!er) {
        const name = l.albumId
        let Album = await fetch("https://api.deezer.com/album/" + name)
        Album = await Album.json()
        let Songs = await fetch(Album.data[0].tracklist)
        Songs = await Songs.json()
        let Genre = await fetch("https://api.deezer.com/genre/" + Album.data[0].genre_id)
        Genre = await Genre.json()
        res.render('../views/listing.ejs', {
            Item: l,
            Album: Album.data[0],
            Songs: Songs.data,
            Genre: Genre,
            Email: res.locals.Email
        });
    }
}

const newListing = (req,res)=>{
    if (res.locals.Email !== "") {
        res.render("../views/newListing.ejs", {
            Email: res.locals.Email
        });
    }else{
        res.redirect("http://localhost:8080/login")
    }
}


module.exports = {
    search,listing,newListing,postNewListing
}
