const router = require("express").Router();
const productCntrl = require('../controllers/productCntrl')
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.post("/products",auth, admin, productCntrl.createProduct);
router.get("/products", productCntrl.getProducts);
router.route("/products/:id").delete(productCntrl.deleteProduct).put(productCntrl.updateProduct);

module.exports = router