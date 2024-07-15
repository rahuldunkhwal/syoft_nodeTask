const express = require("express")

const router = express.Router()
const matchToken = require('../middleware/auth').matchToken

const userController = require('../controllers/product')

router.post("/products",matchToken,userController.postProduct)

router.get('/products',matchToken,userController.getProduct)

router.put('/products/:id',matchToken,userController.putProduct)

router.delete("/products/:id",matchToken,userController.deleteProduct)

module.exports = router