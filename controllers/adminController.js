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
    res.render("adminStatistics.ejs", {User:res.locals, Users:users,ActiveListingsAmount : listings.length, closedListingsAmount:closedlistings.length, ActiveListings: listings, ClosedListings: closedlistings})
}
const promote = async (req,res) =>{
    if (res.locals.Email !== ""){
        if (res.locals.isAdmin){
            const user =await Users.findById(req.body._id)
            user.isAdmin = true;
            user.save()
            res.sendStatus(200)
        }
    }
}
const demote = async (req,res) => {
    if (res.locals.Email !== "") {
        if (res.locals.isAdmin) {
            console.log("demote")
            const user = await Users.findById(req.body._id)
            user.isAdmin = false;
            user.save()
            res.sendStatus(200)
        }
    }
}
    const ban = async (req, res) => {
        if (res.locals.Email !== "") {
            if (res.locals.isAdmin) {
                const user = await Users.findById(req.body._id)
                user.banned = true;
                user.save()
                res.sendStatus(200)
            }
        }
    }
    const unban = async (req, res) => {
        if (res.locals.Email !== "") {
            if (res.locals.isAdmin) {
                const user = await Users.findById(req.body._id)
                user.banned = false;
                user.save()
                res.sendStatus(200)
            }
        }
    }

module.exports={admin,activeListings,archivedListings,statistics, promote,demote,ban,unban}
