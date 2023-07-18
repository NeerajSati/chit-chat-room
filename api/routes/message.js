const router = require("express").Router();
const {getAllMessages, isUserMemberOfGroup} = require("../controllers/message")
const {jwtAuthenticationMiddleware} = require("../utils/jwtVerify");

router.get('/all/:id', jwtAuthenticationMiddleware, isUserMemberOfGroup, getAllMessages)

module.exports = router