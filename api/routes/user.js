const router = require("express").Router();
const {updateUser, searchUser} = require("../controllers/user")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");
const formidableMiddleware = require('express-formidable');

router.get('/update', jwtAuthenticationMiddleware, formidableMiddleware(), updateUser)
router.get('/search', jwtAuthenticationMiddleware, searchUser)

module.exports = router