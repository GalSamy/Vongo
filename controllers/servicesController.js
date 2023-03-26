const { login } = require("./loginController")
const express = require("express")
const jwt = require('jsonwebtoken')
require("dotenv").config()

var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var jsonParser = bodyParser.json();
const Album_search = async (req,res) => {
    let name = req.params.q.replace(/ /g,"%20")
   let resp = await fetch("https://api.deezer.com/search/album/?q=" + name)
     resp = await resp.json()
     res.send(resp.data)
}
// Middleware to validate user's session
const renderForUser = (req, res, next) => {
    try {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let cookie = req.cookies['authToken'];
        let token = req.header('Cookie');
        token = token.replace('authToken=','')
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            let userJson = JSON.parse(Buffer.from(token.split('.')[1],"base64"))
            let email = userJson['email']
          //  console.log(email)
            req.email = email
            next()
        }else{
            // Access Denied
            req.email = ''
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('internal server error')

    }
};
module.exports = {
    Album_search,renderForUser
}
