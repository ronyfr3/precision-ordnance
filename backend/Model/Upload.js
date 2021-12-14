const mongoose = require("mongoose");

const UploadFilesSchema = new mongoose.Schema({
  files:  mongoose.Schema.Types.Mixed
});
const files = mongoose.model("UploadFiles", UploadFilesSchema);

module.exports = files;
