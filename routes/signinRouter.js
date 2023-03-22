const express = require("express")
const {login} = require("../controllers/loginController");
const signinRouter = express.Router()

signinRouter.get("/", login)
module.exports ={
    signinRouter
}
