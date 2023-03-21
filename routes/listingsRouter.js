const express = require("express")
const {search,listing} = require("../controllers/searchController");
const listingsRouter = express.Router()

listingsRouter.get("/", search)
listingsRouter.get("/:id", listing)
module.exports ={
    listingsRouter
}
