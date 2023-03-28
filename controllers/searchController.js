const {Listings} = require("../models/listingModel")
const mongoose = require('mongoose')
const fs = require('fs');
const {newListingNotify} = require('./socketModule')
const postNewListing = async (req,res) =>{
    ////console.log(req.locals)
    if (req.locals.email === ""){
         return res.status(409).json({ message: "not logged in" });
    }
    if (!req.file || !req.body.bid || !req.body.picked){
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    let album = await fetch("https://api.deezer.com/album/" + req.body.picked.id)

    await album.json()
    if (album.error){
        return res.status(409).json({ message: "wrong album id" });
    }
    console.log("new listing notify")
    let picked = req.body.picked
    ///console.log("id after send", picked)
    res.send({message:"success"})
    let title = req.body.title
    let a = await fetch("https://api.deezer.com/album/" + picked)
    a = await a.json()
    let release = a.release_date
    let artist = req.body.artist
    //console.log("relese: " + release)
    let newlisting = new Listings({
        listedBy: res.locals,
        photo : "",
        albumId : picked,
        artist : artist,
        lastBid: req.body.bid,
        name: title,
        release: release
    })
    await newlisting.save()
    fs.appendFile("./public/uploads/" + newlisting._id +"."+ req.file.mimetype.split("/")[1], req.file.buffer, (err) => {
        if (err) {
            console.error(err);
        } else {
           // res.send('File saved!');
        }
    });
    newlisting.photo = "/uploads/" + newlisting._id + "."+req.file.mimetype.split("/")[1]
   await newlisting.save()
   newListingNotify()

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
        //console.log(name)
        let Album = await fetch("https://api.deezer.com/album/" + name)
        Album = await Album.json()
        //console.log(Album)
        let Songs = await fetch(Album.tracklist)
        Songs = await Songs.json()
        let Genre = await fetch("https://api.deezer.com/genre/" + Album.genre_id)
        Genre = await Genre.json()
        res.render('../views/listing.ejs', {
            Item: l,
            Album: Album,
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
