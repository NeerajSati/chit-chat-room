const router = require("express").Router();
const { updateUser, searchUser } = require("../controllers/user");
const { jwtAuthenticationMiddleware } = require("../utils/jwtVerify");
const multer = require("multer");
const upload = multer({ dest: "uploads/user/" });

router.put(
  "/update",
  jwtAuthenticationMiddleware,
  upload.single("photo"),
  updateUser
);
router.get("/search", jwtAuthenticationMiddleware, searchUser);

module.exports = router;
