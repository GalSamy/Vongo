const {Listings} = require("../models/listingModel")
const mongoose = require('mongoose')
const fs = require('fs');
const {newListingNotify} = require('./socketModule')
const {Bids} = require("../models/bidModel");
const {Users} = require("../models/userModel")
const {tweet} = require("./twitterController")

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
        lastBid: parseInt(req.body.bid),
        name: title,
        release: release,
        closed: false
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
    await tweet(`${newlisting.listedBy.userName} has listed a vinyl of ${a.title} for a starting bid of ${newlisting.lastBid}$ view here : https://localhost:8080/listings/${newlisting._id}`)
}
const search = async (req,res) => {
    const listings =await Listings.find({closed : false})
    if (res.locals.Email !== ""){
    res.render('../views/listings.ejs', {
        Items:{listings},
        Admin: res.locals.isAdmin
    })}else{
        res.render('../views/listings.ejs', {
            Items:{listings},
            Admin: false
        })}
}
const listing =async (req,res) => {
    let er = false;
    const listingId = req.params.id
    const l = await Listings.findOne({_id: listingId}).catch(() => {
        er = true;
        return res.status(404).send("Resource not found. Invalid ID")
    })
    console.log(er)
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
        res.redirect("/login")
    }
}
const deleteListing = async (req,res) =>{
    console.log(res.locals._id)
    let l = await Listings.findById(req.body.listing)
    if(res.locals._id.equals(l.listedBy._id) || res.locals.isAdmin){
        console.log("deleting")
       let bidsQuery = l.Bids
        Listings.deleteOne({_id : l._id}).then(() => {console.log("deleted")})
        bidsQuery.forEach(b =>{
           Bids.deleteOne({_id:b._id}).then(() => {console.log("deleted")})
        })
        res.json({message : "success"})
    }else{
        res.status(400).json({message : "not an admin or listing owner"})
    }
}
const parametersSearch = async (req,res) =>{
    if (req.params){
        const data = (req.query)
        let query = {}
        if (data.name !== "all"){
            query.name = {}
            query.name.$regex = new RegExp(data.name)
            query.name.$options = "i"
        }
        if (data.artist !== "all"){
            query.artist = {}
            query.artist.$regex = new RegExp(data.artist)
            query.artist.$options = "i"

        }
        if (data.minimum !== "all"){
            query.lastBid = {}
            query.lastBid.$gt = data.minimum
        }
        if (data.maximum !== "all"){
            if (data.minimum === "all"){

            }
            query.lastBid.$lt = data.maximum
        }
        if (data.release !== "all"){
            query.release = data.release
        }
        query.closed = false
        console.log(query)
        let listings =await Listings.find(query)
        if (res.locals.Email !== ""){
            console.log("rendering")
            res.render('../views/listings.ejs', {
                Items:{listings},
                Admin: res.locals.isAdmin
            })}else{
            console.log("rendering")
            res.render('../views/listings.ejs', {
                Items:{listings},
                Admin: false
            })}


    }
}
const closeListing = async (req,res) =>{
    let l = await Listings.findById(req.body.listing)
    let b = await Bids.findById(req.body.bid)
    if(l && res.locals._id.equals(l.listedBy._id)){
        l.closed = true
        l.acceptedBid = b.amount
        l.acceptedBidDate = b.date
        l.acceptedBidder = b.bidBy.userName
        l.save()
        let seller = await Users.findById(l.listedBy._id)
        let bidder = await Users.findById(b.bidBy._id)
        seller.Sells.push(l)
        seller.save()
        bidder.Orders.push(l)
        bidder.save()
        res.send({message : "sell completed"})
        newListingNotify()
    }
}
module.exports = {
    search,listing,newListing,postNewListing,deleteListing,closeListing , parametersSearch
}
