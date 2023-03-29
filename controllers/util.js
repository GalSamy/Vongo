function extractUserInfo(token){
    let userJson = JSON.parse(Buffer.from(token.split('.')[1],"base64"))
    return userJson
}

module.exports = {
    extractUserInfo
}