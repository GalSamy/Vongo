const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
app.set('view engine', 'ejs')

app.use('/', require('./routes/router'))
app.use(express.static(__dirname + '/public'));

var liveServer = require("live-server");
app.get("/", (req, res) => {
    res.render("./views/homepage.ejs"); // replace "index" with the name of your EJS file
  });
mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.on("connected", ()=>{
  console.log("connected")
})
  app.listen(8080)
  app.on("ready", ()=> {
    console.log("listening port 8080")
  })
