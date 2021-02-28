const router = require('express').Router();
const auth = require('../MiddleWares/auth');
const { check } = require('express-validator');
const {registerUser, loginUser, getUserById,getAllUsers} = require('../controllers/userController')


router.post('/register',[
    check('name','name is required').not().isEmpty(),
    check('email','please include a valid email').isEmail(),
    check('password','please enter a password with 6 or more characters').isLength({min:6})
],registerUser)

router.post('/login',[
    check('email','please include a valid email').isEmail(),
    check('password','please fill the password field').not().isEmpty(),
],loginUser)

router.get('/auth',auth ,getUserById)

router.get('/',auth ,getAllUsers)

module.exports = router;