const mongoose = require('mongoose')
const {Users, userModel} = require("../models/userModel")
const socketIo = require('socket.io');
const {notifyUser} = require('./socketModule')

const { login } = require("./loginController")
const express = require("express")
const jwt = require('jsonwebtoken')
const util = require('util')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var jsonParser = bodyParser.json();
const Album_search = async (req,res) => {
    let name = req.params.q.replace(/ /g,"%20")
   let resp = await fetch("https://api.deezer.com/search/album/?q=" + name)
     resp = await resp.json()
     res.send(resp.data)
}
function extractUserInfo(token){
    let userJson = JSON.parse(Buffer.from(token.split('.')[1],"base64"))
    return userJson
}
function verifyUser(token){
    var verify = jwt.verify(token,process.env.JWT_SECRET_KEY)
    return verify;
}
async function getUserInfo(email){
    let user = await Users.findOne({email:email});
    return user
}
var count = 0;
// Middleware to validate user's session
const renderForUser = async (req, res, next) => {
    console.log("renderForUser activated")
    console.log("---------------------"+count)
    count++
    req.locals = {'Email':'tal'}
    res.locals = {'Email':''}
    try {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let cookie = req.cookies['authToken'];
        let token = req.header('Cookie');
        token = token.replace('authToken=','')
        console.log("token (inside renderForUser) "+ token)
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            let userJson = extractUserInfo(token)
            let email = userJson['email']
            let userInfo = await getUserInfo(email)

            console.log(userInfo)
           // console.log("email is: "+email)
            res.locals = userInfo
            next()
        }else{
            // Access Denied
            req.locals.Email = ''
            next();
        }
    }
    catch(err){
        console.log("Error: "+err);
        req.locals.Email = ''
        next()

    }
};
const {Bids} = require("../models/bidModel")
const {Listings} = require("../models/listingModel")

const newBid = async (req,res) => {
    let amount = parseInt(req.body.bid)
    console.log(req.body.bidBy)
    let l = await Listings.findById(req.body.listing)
    let bb = await Users.findById(req.body.bidBy)
    let newBid = new Bids({
        bidBy: bb,
        amount:amount,
        listing:l
    })
    newBid =await newBid.save()
    console.log(newBid.bidBy)
    l.Bids.push(newBid)
    l.lastBid = amount
    l.save()
    notifyUser("somechecks","ykvnkl2@gmail.com")
    await res.send({lastBid: newBid.amount})
    
}


module.exports = {
    Album_search,renderForUser,verifyUser,extractUserInfo,newBid
}
