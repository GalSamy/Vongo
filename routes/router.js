const express = require("express")
const {index}  = require("../controllers/homepageController")
const{profileRouter} = require("./profileRouter")
const {signinRouter} = require("./signinRouter")
const {registerRouter} =  require("./registerRouter")
const {listingsRouter} = require("./listingsRouter");
const router = express.Router()

router.get("/",index)
router.use("/profile", profileRouter)
router.use("/login", signinRouter)
router.use("/register",registerRouter)
router.use("/listings", listingsRouter)
//router.get("/search", search)


module.exports = router
