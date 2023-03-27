const {Users} = require("../models/userModel")
const {locals} = require("express/lib/application");

let CurrentUser = {
    userPhoto: "/assets/IMG_1154.jpg",
    userId: "123",
    userName: "Gal Samy",
    Location: "Rishon Lezion, Israel",
    Sells: [{},{},{}],
    Orders: [{},{},{}]
} // get from cookies or smth

const profile = async (req,res) => {
    if (req.params.userid === "@me") // /users/@me is the profile page
    {
        console.log(res.locals.email)
        if (res.locals.email){
        res.render('../views/profile.ejs', {User:res.locals, isProfile:true});
        }else{
            res.redirect("http://localhost:8080/login")
            return;
        }
    }else {
        let user = await Users.findOne({_id: req.params.userid}).catch(e => {
            res.sendStatus(404)
        })
            res.render('../views/profile.ejs', {User: user, isProfile:false});
    }
}
const profileSells = (req,res) =>{

}
const profileOrders = (req,res) =>{

}

module.exports = {
    profile, profileSells,profileOrders
}
