const express = require("express")
const {index}  = require("../controllers/homepageController")
const{profile} = require("../controllers/profileController")
const {login} = require("../controllers/loginController")
const {register} =  require("../controllers/registerController")
const router = express.Router()

router.get("/",index)
router.get("/profile", profile)
router.get("/login", login)
router.get("/register",register)
//router.get("/search", search)


module.exports = router
