const Users = require("../models/userModel")

const register = (req,res) => {
    res.render('../views/register.ejs', {User:{}});
}
function user_creation_handler(user,_email,hash)
{
    const newUser = new Users.userModel({
        userName:user,
        email:_email,
        passwordHash:hash
});
    newUser.save()

}

module.exports = {
    register,
}
