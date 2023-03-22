//  const users = [];
//  let user = users.get(req.params.userid)
let user = {
    userPhoto: "/assets/profile%20stock%201.png",
    userId: "456",
    userName: "Mark Robert",
    Location: "Los Angeles, California",
    Sells: [{},{},{}, {}],
    Orders: [{},{},{}]
}// fetch from DB
let CurrentUser = {
    userPhoto: "/assets/IMG_1154.jpg",
    userId: "123",
    userName: "Gal Samy",
    Location: "Rishon Lezion, Israel",
    Sells: [{},{},{}],
    Orders: [{},{},{}]
} // get from cookies or smth
let users = [user,CurrentUser]
const profile = (req,res) => {
    const resp = users.filter(u => u.userId === req.params.userid)
    console.log(resp)
    if (req.params.userid === "@me") // /users/@me is the profile page
    {
        res.render('../views/profile.ejs', {User:CurrentUser});
    }
    else if(!(resp.length === 0)){
        res.render('../views/profile.ejs', {User:resp[0]});
    }else{
        res.send("404")
    }
}
const profileSells = (req,res) =>{

}
const profileOrders = (req,res) =>{

}

module.exports = {
    profile, profileSells,profileOrders
}
