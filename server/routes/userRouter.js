const router = require('express').Router()
const userCntrl = require('../controllers/userCntrl')


router.post('/register',userCntrl.register)
router.get("/refresh_token", userCntrl.refreshToken);


module.exports = router
