const router = require("express").Router();
const {registerUser, multerSaveImage} = require("../controllers/auth")

router.get('/login',async(req,res)=>{
    res.status(200).json({success:true})
})
router.get('/register', multerSaveImage, registerUser)

module.exports = router