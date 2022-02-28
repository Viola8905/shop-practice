const router = require("express").Router();
const categoryCntrl = require("../controllers/categoryCntrl");

router.get("/category", categoryCntrl.getCategories);


module.exports = router;
