const mongoose = require('mongoose')
const {Users} = require("../models/userModel")
const {listingModel,Listings} = require("../models/listingModel")
const admin = async (req,res)=>{
    let users = await Users.find({})
    const listings = await Listings.find({closed:false})
    const closedlistings = await Listings.find({closed:true})
    res.render("../views/adminPanel.ejs",{User:res.locals, Users:users,ActiveListingsAmount : listings.length, closedListingsAmount:closedlistings.length})
}
const activeListings = async (req,res) =>{
    let users = await Users.find({})
    const listings = await Listings.find({closed:false})
    const closedlistings = await Listings.find({closed:true})
    res.render("activeListings.ejs", {User:res.locals,Items : {listings}, Admin: true, usersAmount:users.length,closedListingsAmount: closedlistings.length})
}
const archivedListings = async (req,res) =>{
    let users = await Users.find({})
    const listings = await Listings.find({closed:true})
    const Activelistings = await Listings.find({closed:false})
    res.render("ArchivedListings.ejs", {User:res.locals,Items : {listings}, Admin: true, usersAmount:users.length, activeListingsAmount:Activelistings.length})
}
const statistics = async (req,res) =>{
    let users = await Users.find({})
    const listings = await Listings.find({closed:false})
    const closedlistings = await Listings.find({closed:true})
    res.render("adminStatistics.ejs", {User:res.locals, Users:users,ActiveListingsAmount : listings.length, closedListingsAmount:closedlistings.length})
}
module.exports={admin,activeListings,archivedListings,statistics}
