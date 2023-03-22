const express = require("express")
const {register} = require("../controllers/registerController");
const { userModel } = require("../models/userModel");
const registerRouter = express.Router()

registerRouter.get("/", register)


registerRouter.post("/createUser",function(req,res){
    const UserCreds = new userModel({
        userName:req.body.userName,
        email:req.body.email,
        passwordHash:req.hash
    });
    UserCreds.save();
})
module.exports ={
    registerRouter
}