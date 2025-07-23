const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uniqid = require("uniqid");

const cloudinaryFileUpload = async (file) => {
  const photoPath = `./tmp/${uniqid()}`;
  const hasBeenMoved = await file.mv(photoPath);

  if (!hasBeenMoved) {
    const cloudinaryResult = await cloudinary.uploader.upload(photoPath);

    fs.unlinkSync(photoPath);

    return cloudinaryResult.secure_url;
  } else {
    return { return: false, error: hasBeenMoved };
  }
};

module.exports = { cloudinaryFileUpload };
