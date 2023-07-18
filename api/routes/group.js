const router = require("express").Router();
const {createGroup, createGroupValidate, joinedGroups, getGroupDetails, getGroupMembers} = require("../controllers/group")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");
const formidableMiddleware = require('express-formidable');

router.post('/create', jwtAuthenticationMiddleware, formidableMiddleware(), createGroupValidate, createGroup)
router.get('/joined', jwtAuthenticationMiddleware, joinedGroups)
router.get('/details/:id', jwtAuthenticationMiddleware, getGroupDetails)
router.get('/members/:id', jwtAuthenticationMiddleware, getGroupMembers)

module.exports = router