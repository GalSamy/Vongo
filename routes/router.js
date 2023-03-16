const express = require("express")
const {index}  = require("../controllers/homepageController")
const{profile} = require("../controllers/profileController")
const router = express.Router()

router.get("/",index)
router.get("/profile", profile)
//router.get("/search", search)


module.exports = router