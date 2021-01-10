const routes = require('express').Router(); /*Fonctions de routes dans express*/
const userController = require('../Controllers/userController')
const productController = require('../Controllers/productController')
const authController = require('../Controllers/authController');

routes.get('/', (req, res) => {
    res.json({
        message: "Hello"
    })
})


routes.post('/login', authController.login)





//Exportation des routes pour app.js
module.exports = routes