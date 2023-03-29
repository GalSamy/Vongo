const express = require("express")
const {admin} = require("../controllers/adminController");
const adminRouter = express.Router()

adminRouter.get("/", admin)
module.exports ={
    adminRouter
}
