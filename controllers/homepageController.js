const index = (req,res) => {
    console.log("index locals "+res.locals.Email)
    res.render('../views/homepage.ejs', {Email : res.locals.Email});
}

module.exports = {
    index,
}
