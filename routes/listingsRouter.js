const express = require("express")
const {search,listing, newListing} = require("../controllers/searchController");
const { renderForUser } = require("../controllers/servicesController");
const listingsRouter = express.Router()
listingsRouter.get("/new",newListing)
listingsRouter.get("/",search)
listingsRouter.get("/:id",listing)
module.exports ={
    listingsRouter
}
