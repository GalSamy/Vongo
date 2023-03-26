const express = require("express")
const {Album_search} = require("../controllers/servicesController");
const servicesRouter = express.Router()

servicesRouter.get("/album_search/:q", Album_search)
module.exports ={
    servicesRouter
}
