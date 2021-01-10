const User = require("../Models/User")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

/**
 * @description Get all users
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function allUsers(req, res){
   try {
       const user = await User.find()
       res.status(200).json(user)
   }catch(err){
        res.status(500).json(err)
   }
}


/**
 * @description Get one user by his id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function oneUser(req, res){
    try {
        await User.find({
            _id: req.params.id
        }).then((user) => {
            if(user === null){
                res.status(404).json({message: "Cannot find user"})
            }
            else{
                res.json(user)
            }
        })
    }catch (err){
        res.status(500).json({message: err.message})
    }
}

/**
 * @description Get one user by his name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function oneUserByName(req, res) {
    try {
        await User.find({
            name: req.params.name
        }).then((user) => {
            if(user === null){
                res.status(404).json({message: "Cannot find user"})
            }
            else{
                res.status(200).json(user)
            }
        })
    }catch (err){
        res.status(500).json(err.message)
    }
}


/**
 * @description Add an user in DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function addUser(req, res) {
    const newUser = new User({
        name: req.body.name,
        mail: req.body.mail,
        password: bcrypt.hashSync(req.body.password, 10),
        token: bcrypt.hashSync(new Date().getTime().toString(), 10)
    })
    try {
        const newUserSave = await newUser.save()
        res.status(201).json(newUserSave)
    }catch (err){
        res.status(404).json({message: err})
    }
}



/**
 * @description Modify an user in DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function modifyUser(req, res){
    try {
        await User.updateOne({_id: req.params.id}, {
            $set: {
                name: req.body.name,
                mail: req.body.mail,
                password: bcrypt.hashSync(req.body.password, 10)
            }
        })
        res.json({message: "modified"})
    }
    catch (err){
        res.json({message: err.message})
    }
}

/**
 * @description Delete an user in DB
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function deleteUser(req, res, next){
    try {
        await User.deleteOne({_id: req.params.id})
        res.json({message: "deleted"})
    }
    catch (err){
        res.json({message: err.message})
    }
}


module.exports = {
    allUsers,
    addUser,
    oneUser,
    oneUserByName,
    modifyUser,
    deleteUser
}


