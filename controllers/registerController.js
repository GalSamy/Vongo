const mongoose = require('mongoose')
const {Users} = require("../models/userModel")
const fs = require("fs")
const download = require("download")
const register = (req,res) => {
    res.render('../views/register.ejs', {User:{},
    Email : res.locals.Email
    });
}

function validateEmail(email) {
  // Regular expression to match email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const user_creation_handler = async (req, res) => {
  console.log(req.body)
  console.log(Users)
  const { username, email, password_hash, location } = req.body;

  // Basic validation to ensure all required fields are present and non-empty
  if (!username || !email || !password_hash || !location) {
      return res.status(400).json({ message: "Please provide all required fields" });
  }
  if(!validateEmail(email))
  {
    return res.status(400).json({ message: "Email format is incorrect" });
  }

  // Check if username or email already exists in the database
  const existingUser = await Users.findOne({ $or: [{ userName: username }, { email: email }] });
  if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists" });
  }
  // fetch map of picked location
    let l = location.replace(/ /g,"%20")
    let locationInfo = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${l}&access_token=pk.eyJ1IjoiZ2Fsc2FteSIsImEiOiJjbGZyZWwzM3IwN3JtM3hueHJmbzIxenphIn0.ITT70bcMO5z7cRW3zwBHuQ`)
    locationInfo = await locationInfo.json()
    let cords = locationInfo.features[0].geometry.coordinates
    let pic =`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${cords[0]},${cords[1]},9,0/400x400?access_token=pk.eyJ1IjoiZ2Fsc2FteSIsImEiOiJjbGZyZWwzM3IwN3JtM3hueHJmbzIxenphIn0.ITT70bcMO5z7cRW3zwBHuQ`
    if (!fs.existsSync("./public/maps/" + location + ".jpg")) {
       // const route =await fs.createWriteStream("./public/maps/" + location + ".jpg");
       await fs.writeFileSync("./public/maps/" + location + ".jpg", await download(pic));
       // fs.appendFile("./public/maps/" + location + ".map", p)
    }
    // Create a new user object
  const newUser = new Users({
      userName: username,
      email: email,
      Location: location,
      passwordHash: password_hash,
      LocationMap : "/maps/" + location + ".jpg"
  });

  // Save the user object to the database
  await newUser.save();

  // Return a success message to the client

  res.status(201).json({ message: "User created successfully" });
};

module.exports = {
    register,user_creation_handler,
}
