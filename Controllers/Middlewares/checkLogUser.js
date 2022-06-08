const jwt = require("jsonwebtoken")

async function checkLogged(req, res, next) {
    //Get auth Header Value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined"){
        const bearerToken = extractToken(bearerHeader, res);
        req.user = await verifyToken(bearerToken, res)
        next()
    }
    else {
        res.status(503).json({message: "Denied Access"})
    }
}

async function verifyToken(tok, res){
    try {
        let token = await jwt.verify(tok, process.env.JWT_SECRET)
        return token;
    }catch (e) {
        return res.status(503).json({message: "Denied Access"})
    }
}

function extractToken(token, res){
    const bearer = token.split(' ');
    if (bearer.length === 2) {
        return bearer[1];
    }else {
        return res.status(503).json({message: "Denied Access"})
    }
}

module.exports = {
    checkLogged
}