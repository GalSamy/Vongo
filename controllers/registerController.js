const register = (req,res) => {
    res.render('../views/register.ejs', {User:{}});
}

module.exports = {
    register,
}
