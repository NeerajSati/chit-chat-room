const router = require("express").Router();
const {updateUser} = require("../controllers/user")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");

router.get('/update', jwtAuthenticationMiddleware, updateUser)

module.exports = router