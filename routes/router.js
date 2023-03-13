const express = require("express")
const {index}  = require("../controllers/homepageController")
const router = express.Router()

router.get("/",index)
//router.get("/search", search)


module.exports = router