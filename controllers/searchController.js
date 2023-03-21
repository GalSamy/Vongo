let listedBy = {
    userPhoto: "/assets/IMG_1154.jpg",
    userId: "123",
    userName: "Gal Samy",
    Location: "Rishon Lezion, Israel",
    Sells: [{}, {}, {}],
    Orders: [{}, {}, {}]
}

let exItem = {
    photo:"https://upload.wikimedia.org/wikipedia/he/3/3b/Dark_Side_of_the_Moon.png",
    name:"The Dark Side Of The Moon",
    artist: "Pink Floyd",
    year: "1973",
    listedBy: listedBy,
    lastBid: "30$",
    id: 0
}
let listings = []
for (let i = 0; i<9; i++){
    listings.push(exItem)
}


 search = (req,res) => {
    res.render('../views/listings.ejs', {Items:{listings}});
}
const listing = (req,res) => {
    const listingId = req.params.id
   // item = items.get(listingId)
    res.render('../views/listing.ejs', {Item:{listingId}});
}
module.exports = {
    search,listing
}
