const router = require("express").Router();
const {registerUser, registerUserValidate, loginUserValidate, loginUser, multerSaveImage} = require("../controllers/auth")

router.get('/login', loginUserValidate, loginUser)
router.get('/register', multerSaveImage, registerUserValidate, registerUser)

module.exports = router