const mongoose = require('mongoose')
const {Users} = require("../models/userModel")
const {listingModel,Listings} = require("../models/listingModel")
const admin = async (req,res)=>{
    let sells_data = await Listings.find({closed:true })
    console.log("sells data"+sells_data[0]['_id'])
    console.log("sells data"+sells_data)
    res.render("../views/adminPanel.ejs",{User:res.locals, isProfile:true})
}
module.exports={admin}