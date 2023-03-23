const userModel = require("../models/userModel")

const register = (req,res) => {
    res.render('../views/register.ejs', {User:{}});
}
const user_creation_handler = async (req, res) => {
    console.log(req.body)
    const { username, email, password, location } = req.body;
    
        //const hashValue = crypto.createHash('md5').update(username+email+password).digest('hex');
      // Create a new user object
      const newUser = new userModel({ 
        userName: username,
        email: email,
        Location:location,
        passwordHash:password_hash,
        });
  
      // Save the user object to the database
      await newUser.save();
  
      // Return a success message to the client
      res.status(201).json({ message: "User created successfully" });

  };
module.exports = {
    register,user_creation_handler,
}
