const { constants } = require("../utils/constants");
const User = require("../models/UserSchema");
const { uploadImage } = require("../utils/CloudinaryUpload");

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const userName = req.userName;
    const { deleteImage } = req.body;
    const photo = req.file;
    if (!photo && !deleteImage) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide an image!" });
    }

    if (deleteImage) {
      // delete image
      await User.findByIdAndUpdate(userId, { profilePic: "" });
      return res
        .status(200)
        .json({ success: true, msg: "Profile Image deleted successfully!" });
    }

    let profilePic = await uploadImage("personal-profile-" + userName, photo);
    await User.findByIdAndUpdate(userId, { profilePic });

    return res
      .status(200)
      .json({ success: true, msg: "Profile Image updated successfully!" });
  } catch (err) {
    console.log("updateUser Error", err);
    return res
      .status(400)
      .json({ success: false, msg: constants.genericError, error: err });
  }
};

const searchUser = async (req, res) => {
  try {
    const searchName = req.query.searchName;
    const userId = req.userId;
    let usersList;
    if (!searchName) {
      usersList = await User.find();
    } else {
      usersList = await User.find({
        username: {
          $regex: `${searchName}`,
          $options: "i",
        },
      });
    }

    let data = usersList.map((obj) => {
      return {
        _id: obj._id,
        username: obj.username,
        profilePic: obj.profilePic,
      };
    });
    data = data.filter((obj) => !obj._id.equals(userId));

    return res
      .status(200)
      .json({ success: true, msg: "Users fetched successfully!", data: data });
  } catch (err) {
    console.log("updateUser Error", err);
    return res
      .status(400)
      .json({ success: false, msg: constants.genericError, error: err });
  }
};

module.exports = {
  updateUser,
  searchUser,
};
