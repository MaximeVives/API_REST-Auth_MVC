const routes = require('express').Router(); /*Fonctions de routes dans express*/
const userController = require('../Controllers/userController')
const productController = require('../Controllers/productController')

routes.get('/users', userController.allUsers)
routes.get('/user/:id', userController.oneUser)
routes.get('/user/:name', userController.oneUserByName)
routes.post('/user', userController.addUser)
routes.patch('/user/:id', userController.modifyUser)
routes.delete('/user/:id', userController.deleteUser)

routes.get('/products', productController.allProducts)
routes.get('/product/id/:id', productController.oneProduct)
routes.get('/product/name/:name', productController.oneProductByName)
routes.post('/product', productController.addProduct)
routes.patch('/product/:id', productController.modifyProduct)
routes.delete('/product/:id', productController.deleteProduct)

//Exportation des routes pour app.js
module.exports = routes