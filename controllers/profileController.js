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
    let er = false;
    if (req.params.userid === "@me") // /users/@me is the profile page
    {
        /*
        let location = res.locals.Location.replace(/ /g,"%20")
        let locationInfo = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${location}&access_token=pk.eyJ1IjoiZ2Fsc2FteSIsImEiOiJjbGZyZWwzM3IwN3JtM3hueHJmbzIxenphIn0.ITT70bcMO5z7cRW3zwBHuQ`)
         locationInfo = await locationInfo.json()
        let cords = locationInfo.features[0].geometry.coordinates
        let pic =`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${cords[0]},${cords[1]},9,0/400x400?access_token=pk.eyJ1IjoiZ2Fsc2FteSIsImEiOiJjbGZyZWwzM3IwN3JtM3hueHJmbzIxenphIn0.ITT70bcMO5z7cRW3zwBHuQ`
        //move all of this to user creation and add a map photo field to user scheme
         */
        if (res.locals.email){
        res.render('../views/profile.ejs', {User:res.locals, isProfile:true,Pic:res.locals.LocationMap});
        }else{
            res.redirect("http://localhost:8080/login")
            return;
        }
    }else {
        let user = await Users.findOne({_id: req.params.userid}).catch(e => {
            console.log("catch " + e)
            res.status(404).send("Resource not found. Invalid ID")
            er = true;
        })
            if(!er)
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
