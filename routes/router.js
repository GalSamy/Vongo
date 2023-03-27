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
router.use("/users",usersRouter)
router.use("/login", signinRouter)
router.use("/register",registerRouter)
router.use("/listings", listingsRouter)
router.use("/album_api", servicesRouter)
//router.get("/search", search)


module.exports = router
