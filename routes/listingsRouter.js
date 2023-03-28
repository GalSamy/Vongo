const express = require("express")
const {search,listing, newListing,postNewListing} = require("../controllers/searchController");
const { renderForUser } = require("../controllers/servicesController");
const bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: true })
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const listingsRouter = express.Router()
listingsRouter.get("/new",newListing)
listingsRouter.post("/postNew",upload.single('photo'),urlencodedParser,postNewListing)
listingsRouter.get("/",search)
listingsRouter.get("/:id",listing)
module.exports ={
    listingsRouter
}
