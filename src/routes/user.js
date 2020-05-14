const router = require('express').Router()
const userControllers = require('../controllers/user')

router.post('/sign_in', userControllers.postSignIn);
router.post('/sign_up', userControllers.postSignUp);


module.exports = router