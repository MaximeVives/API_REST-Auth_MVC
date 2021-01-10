const jwt = require("jsonwebtoken")

function checkLogged(req, res, next) {
    //Get auth Header Value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        verifyToken(req, res)
        next()

    }else{
        res.status(403).json({message: "Denied Access"})
    }

}

function verifyToken(req, res){
    jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
        if (err){
            res.status(403).json({message: "Denied Access"})
        }
    })
}

module.exports = {
    checkLogged
}