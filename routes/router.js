const express = require("express")
const {index}  = require("../controllers/homepageController")
const{profileRouter} = require("./profileRouter")
const {signinRouter} = require("./signinRouter")
const {registerRouter} =  require("./registerRouter")
const {listingsRouter} = require("./listingsRouter");
const {usersRouter} = require("./usersRouter")
const {servicesRouter} = require("./servicesRouter");
require("dotenv").config()
const jwt = require('jsonwebtoken')
const {renderForUser} = require("../controllers/servicesController")
const router = express.Router()

router.get("/",renderForUser,index)
router.use("/users",renderForUser,usersRouter)
router.use("/login",renderForUser,signinRouter)
router.use("/register",renderForUser,registerRouter)
router.use("/listings",renderForUser,listingsRouter)
router.use("/album_api", servicesRouter)
//router.get("/search", search)


module.exports = router
