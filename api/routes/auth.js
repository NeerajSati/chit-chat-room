const router = require("express").Router();
const {registerUser, registerUserValidate, loginUserValidate, loginUser} = require("../controllers/auth")
const formidableMiddleware = require('express-formidable');

router.post('/login', loginUserValidate, loginUser)
router.post('/register', formidableMiddleware(), registerUserValidate, registerUser)
// router.get('/register', multerImageMiddleware, registerUserValidate, registerUser)

module.exports = router