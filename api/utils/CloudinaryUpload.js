const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadImage = async (fileInitial, image) => {
  try {
    const uploaded = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
      public_id: fileInitial,
    });
    return uploaded.url;
  } catch (err) {
    throw err;
  }
};

module.exports = { uploadImage };
