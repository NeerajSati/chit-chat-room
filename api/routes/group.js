const router = require("express").Router();
const {createGroup, createGroupValidate} = require("../controllers/group")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");
const formidableMiddleware = require('express-formidable');

router.post('/create', jwtAuthenticationMiddleware, formidableMiddleware(), createGroupValidate, createGroup)

module.exports = router