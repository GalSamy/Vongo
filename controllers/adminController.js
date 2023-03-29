const mongoose = require('mongoose')
const {Users} = require("../models/userModel")

const admin = async (req,res)=>{
    let sells_data = await Users.find({Sells:{ $exists: true, $not: { $size: 0 } } }, {Sells: 1, _id: 0})
    console.log(sells_data)
    res.render("../views/adminPanel.ejs",{User:res.locals, isProfile:true})
}
module.exports={admin}