const express = require("express")
const app = express()

app.set('view engine', 'ejs')

app.use('/', require('./routes/router'))
app.use(express.static("public"))

var liveServer = require("live-server");
app.get("/", (req, res) => {
    res.render("./views/homepage.ejs"); // replace "index" with the name of your EJS file
  });

  app.listen(8080)
  app.on("ready", ()=> {
    console.log("listening port 8080")
  })