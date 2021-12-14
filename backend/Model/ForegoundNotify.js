const mongoose = require("mongoose");
const ForegroundSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
    details: {
      productName: String,
      totalPrice: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", ForegroundSchema);
