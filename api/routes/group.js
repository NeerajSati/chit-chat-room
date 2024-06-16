const router = require("express").Router();
const {
  createGroup,
  createGroupValidate,
  joinedGroups,
  getGroupDetails,
  getGroupMembers,
  updateGroupDetails,
  updateGroupAdmins,
  createChatValidate,
  createChat,
} = require("../controllers/group");
const { jwtAuthenticationMiddleware } = require("../utils/jwtVerify");
const multer = require("multer");
const upload = multer({ dest: "uploads/group/" });

router.post(
  "/create",
  jwtAuthenticationMiddleware,
  upload.single("groupProfilePic"),
  createGroupValidate,
  createGroup
);
router.post(
  "/createSingle",
  jwtAuthenticationMiddleware,
  createChatValidate,
  createChat
);
router.get("/joined", jwtAuthenticationMiddleware, joinedGroups);
router.get("/details/:id", jwtAuthenticationMiddleware, getGroupDetails);
router.get("/members/:id", jwtAuthenticationMiddleware, getGroupMembers);
router.put(
  "/update/:id",
  jwtAuthenticationMiddleware,
  upload.single("groupProfilePic"),
  updateGroupDetails
);
router.put("/admin/:id", jwtAuthenticationMiddleware, updateGroupAdmins);

module.exports = router;
