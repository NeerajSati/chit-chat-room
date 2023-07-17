const router = require("express").Router();
const {registerUser, registerUserValidate, loginUserValidate, loginUser} = require("../controllers/auth")
const {multerSaveImage} = require("../utils/multer")

router.get('/login', loginUserValidate, loginUser)
router.get('/register', multerSaveImage, registerUserValidate, registerUser)

module.exports = router