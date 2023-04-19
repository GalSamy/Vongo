const {Users} = require("../models/userModel")
const {Listings} = require("../models/listingModel")

const {locals} = require("express/lib/application");
require("dotenv").config()


const profile = async (req,res) => {
    let er = false;
    if (req.params.userid === "@me" || res.locals._id.equals(req.params.userid)) // /users/@me is the profile page
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
        res.render('../views/profile.ejs', {User:res.locals, isProfile:true, GoogleKey: process.env.GOOGLE_MAPS_KEY});
        }else{
            res.redirect("/login")
            return;
        }
    }else {
        let user = await Users.findOne({_id: req.params.userid}).catch(e => {
            console.log("catch " + e)
            res.status(404).send("Resource not found. Invalid ID")
            er = true;
        })
            if(!er)
            res.render('../views/profile.ejs', {User: user, isProfile:false, GoogleKey: process.env.GOOGLE_MAPS_KEY});
    }
}
const sellsToArray = (sells) => {
    data = [
      { month: "Jan", sales: 0 },
      { month: "Feb", sales: 0 },
      { month: "Mar", sales: 0 },
      { month: "Apr", sales: 0 },
      { month: "May", sales: 0 },
      { month: "Jun", sales: 0 },
      { month: "Jul", sales: 0 },
      { month: "Aug", sales: 0 },
      { month: "Sep", sales: 0 },
      { month: "Oct", sales: 0 },
      { month: "Nov", sales: 0 },
      { month: "Dec", sales: 0 },
    ];
    console.log("month" +sells[0].acceptedBidDate.getMonth())
    sells.forEach((sale) => {
        data[sale.acceptedBidDate.getMonth()].sales++;
    });
    console.log(data)
    return data;
  };
const ordersToArray = (orders) => {
    data = [
      { month: "Jan", orders: 0 },
      { month: "Feb", orders: 0 },
      { month: "Mar", orders: 0 },
      { month: "Apr", orders: 0 },
      { month: "May", orders: 0 },
      { month: "Jun", orders: 0 },
      { month: "Jul", orders: 0 },
      { month: "Aug", orders: 0 },
      { month: "Sep", orders: 0 },
      { month: "Oct", orders: 0 },
      { month: "Nov", orders: 0 },
      { month: "Dec", orders: 0 },
    ];
    console.log("month" +orders[0].acceptedBidDate.getMonth())
    orders.forEach((sale) => {
        data[sale.acceptedBidDate.getMonth()].orders++;
    });
    console.log(data)
    return data;
  };
const profileSells = async(req,res) =>{
    //const sells =await Listings.find({closed : true, "listedBy.userName":res.locals.userName})
    const user = await Users.findOne({ userName: res.locals.userName }).select('Sells');
    const sells = user.Sells
    s=[]
    if (sells.length)
        s = sellsToArray(sells)
    res.render("../views/sells.ejs",{
        util:sellsToArray,
        User:res.locals,
        data:s,
        Items:sells
    })

}
const profileOrders = async(req,res) =>{
    const user = await Users.findOne({ userName: res.locals.userName }).select('Orders');
    const orders = user.Orders
    console.log(orders + orders.length)
    s=[]
    if (orders.length)
        s = ordersToArray(orders)
    res.render("../views/orders.ejs",{
        util:ordersToArray,
        User:res.locals,
        data:s,
        Items:orders
    })
}
const profileListings= async(req,res) =>{
    console.log(res.locals.userName)
    let listings = await Listings.find({ "listedBy.userName": res.locals.userName })
    listings = listings.filter((listing)=> listing.closed==false)
    console.log("listings"+listings);
    s=[]
    res.render("../views/profileListings.ejs",{
        User:res.locals,
        Items:listings
    })
}


module.exports = {
    profile, profileSells,profileOrders,profileListings,sellsToArray
}
