const router = require('express').Router()
const userCntrl = require('../controllers/userCntrl')
const auth = require ('../middleware/auth')


router.post('/register',userCntrl.register)
router.post("/login", userCntrl.login);
router.get("/logout", userCntrl.logout);
router.get("/refresh_token", userCntrl.refreshToken);

router.get("/info", auth, userCntrl.getUser);


module.exports = router
