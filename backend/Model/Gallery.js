const mongoose = require("mongoose");

const ImageGallery = new mongoose.Schema(
  {
    filename: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("ImageGallery", ImageGallery);