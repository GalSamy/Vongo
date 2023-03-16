const profile = (req,res) => {
    res.render('../views/profile.ejs', {User:{}});
}

module.exports = {
    profile,
}