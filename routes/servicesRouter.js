const express = require("express")
const {Album_search,newBid, renderForUser} = require("../controllers/servicesController");
const bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: true })

const servicesRouter = express.Router()
servicesRouter.get("/album_search/:q", Album_search)
servicesRouter.post("/newBid",urlencodedParser,newBid)
module.exports ={
    servicesRouter
}
