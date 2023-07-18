const router = require("express").Router();
const {createGroup, createGroupValidate, joinedGroups} = require("../controllers/group")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");
const formidableMiddleware = require('express-formidable');

router.post('/create', jwtAuthenticationMiddleware, formidableMiddleware(), createGroupValidate, createGroup)
router.get('/joined', jwtAuthenticationMiddleware, joinedGroups)

module.exports = router