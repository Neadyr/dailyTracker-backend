const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uniqid = require("uniqid");
const streamifier = require("streamifier");

const cloudinaryFileUpload = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // any upload options you need
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // <-- resolve with your HTTPS URL
      }
    );

    streamifier.createReadStream(file.data).pipe(uploadStream);
  });
};

module.exports = { cloudinaryFileUpload };
