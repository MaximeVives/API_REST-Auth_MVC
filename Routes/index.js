// import des modules
const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');

// Middleware pour checker si le routage est valide
router.use((req, res, next) => {
    const date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${req.method} ${req.url}`);
    next();
})


router.get("/", indexController.index);
router.get("/:id", indexController.show);
router.put("/", indexController.create);
router.patch("/:id", indexController.update);
router.delete("/:id", indexController.deleteIndex);

module.exports = router;

// router post est utiliser pour tout ce qui rentre pas dans les précédentes cases