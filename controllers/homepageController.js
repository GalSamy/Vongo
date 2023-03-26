const index = (req,res) => {
    console.log(req.email)
    res.render('../views/homepage.ejs', {Email : req.email});
}

module.exports = {
    index,
}
