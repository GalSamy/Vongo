const express = require("express")
const {register} = require("../controllers/registerController");
const registerRouter = express.Router()

registerRouter.get("/", register)
module.exports ={
    registerRouter
}
