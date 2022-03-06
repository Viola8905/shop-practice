const router = require("express").Router();
const productCntrl = require('../controllers/productCntrl')

router.route("/products").post(productCntrl.createProduct);

router.get("/products", productCntrl.getProducts);
router.route("/products/:id").delete(productCntrl.deleteProduct).put(productCntrl.updateProduct);

module.exports = router