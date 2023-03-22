const express = require("express")
const {search,listing, newListing} = require("../controllers/searchController");
const listingsRouter = express.Router()
listingsRouter.get("/new",newListing)
listingsRouter.get("/", search)
listingsRouter.get("/:id", listing)
module.exports ={
    listingsRouter
}
