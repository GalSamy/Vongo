const express = require("express")
const {admin, activeListings, archivedListings, statistics} = require("../controllers/adminController");
const adminRouter = express.Router()

adminRouter.get("/", admin)
adminRouter.get("/activeListings", activeListings)
adminRouter.get("/archivedListings", archivedListings)
adminRouter.get("/statistics", statistics)
module.exports ={
    adminRouter
}
