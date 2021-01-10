const User = require('../Models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

/**
 * @description Get a Token after authentication
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function login(req, res) {
    await User.findOne({
        mail: req.body.mail
    }).then((user) => {
        if (user === null){
            res.status(404).json({message: "Cannot find user"})
        }
        else{
            const isPasswordGood = bcrypt.compareSync(req.body.password, user.password);
            if (isPasswordGood){
                jwt.sign({user}, process.env.JWT_SECRET, (err, token) => {
                    if (err) {
                        res.status(401).json(err.message)
                    } else {
                        res.json(token);
                    }
                })
            }
            else{
                res.status(401).json({message: "Wrong Password"})
            }
        }

    })
}


module.exports = {
    login
}