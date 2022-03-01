const router = require("express").Router();
const categoryCntrl = require("../controllers/categoryCntrl");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

router.get("/category", categoryCntrl.getCategories);
router.post("/category",auth, admin, categoryCntrl.createCategory);
router.delete("/category/:id", auth, admin, categoryCntrl.deleteCategory);
router.put("/category/:id", auth, admin, categoryCntrl.updateCategory);


module.exports = router;


