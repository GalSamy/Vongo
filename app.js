const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require("dotenv").config()
app.set('view engine', 'ejs')
app.use(cors())
app.use('/', require('./routes/router'))
app.use(express.static(__dirname + '/public'));
//app.use(express.urlencoded({ extended: true }))
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", (req, res) => {
    res.render("./views/homepage.ejs"); // replace "index" with the name of your EJS file
  });
mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.on("connected", ()=>{
  console.log("connected to DB")
})
  app.listen(8080, ()=>{
    console.log("listening port 8080")
  })
