const router = require("express").Router();
const productCntrl = require('../controllers/productCntrl')

router.route("/products").get(productCntrl.getProducts).post(productCntrl.createProduct);


router.route("/products/:id").delete(productCntrl.deleteProduct).put(productCntrl.updateProduct);

module.exports = router