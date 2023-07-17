const router = require("express").Router();
const {updateUser} = require("../controllers/user")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");
const formidableMiddleware = require('express-formidable');

router.get('/update', jwtAuthenticationMiddleware, formidableMiddleware(), updateUser)

module.exports = router