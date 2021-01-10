const Product = require("../Models/Product")

/**
 * @description Get all products
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function allProducts(req, res) {
    try{
        await Product.find().then((product) =>{
            res.status(200).json(product)
        })
    }catch (err) {
        res.status(500).json(err.message)
    }
}

/**
 * @description Get a product by his id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function oneProduct(req, res) {
    try {
        await Product.find({
            _id: req.params.id
        }).then((product) => {
            if (product == null){
                res.status(404).json({message: "Cannot find product"})
            }
            else{
                res.status(200).json(product)
            }
        })
    }catch (err){
        res.status(500).json(err.message)
    }

}

/**
 * @description Get a product by his name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function oneProductByName(req, res) {
    try {
        await Product.find({
            name: req.params.name
        }).then((product) => {
            if (product == null){
                res.status(404).json({message: "Cannot find product"})
            }
            else{
                res.status(200).json(product)
            }
        })
    }catch (err){
        res.status(500).json(err.message)
    }
}

/**
 * Add a product in DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function addProduct(req, res) {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    })
    try {
        const newUserSave = await newProduct.save()
        res.status(201).json(newUserSave)
    }catch (err){
        res.status(404).json({message: err})
    }
}

/**
 * Modify a product in DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function modifyProduct(req, res) {
    try {
        await Product.updateOne({_id: req.params.id}, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            }
        })
        res.json({message: "modified"})
    }
    catch (err){
        res.json({message: err.message})
    }
}

/**
 * Delete a product in DB
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteProduct(req, res) {
    try {
        await Product.deleteOne({_id: req.params.id})
        res.json({message: "deleted"})
    }
    catch (err){
        res.json({message: err.message})
    }
}

module.exports = {
    allProducts,
    oneProduct,
    oneProductByName,
    addProduct,
    modifyProduct,
    deleteProduct
}
