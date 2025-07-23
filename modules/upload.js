const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uniqid = require("uniqid");
const streamifier = require("streamifier");

const cloudinaryFileUpload = async (file) => {
  //
  //  const photoPath = `./tmp/${uniqid()}`;
  // const hasBeenMoved = await file.mv(photoPath);

  // if (!hasBeenMoved) {
  const stream = await cloudinary.uploader.upload_stream((error, result) => {
    if (error) return reject(error);
    resolve(result.secure_url);
  });

  streamifier.createReadStream(file).pipe(stream);

  return stream.secure_url;
  // } else {
  //   return { return: false, error: hasBeenMoved };
  // }
};

module.exports = { cloudinaryFileUpload };
