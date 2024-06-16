const router = require("express").Router();
const {
  registerUser,
  registerUserValidate,
  loginUserValidate,
  loginUser,
} = require("../controllers/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/user/" });

router.post("/login", loginUserValidate, loginUser);
router.post(
  "/register",
  upload.single("photo"),
  registerUserValidate,
  registerUser
);

module.exports = router;
