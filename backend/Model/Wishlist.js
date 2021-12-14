const mongoose = require("mongoose");
const wisglistSchema = new mongoose.Schema({
  products: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Wishlist = mongoose.model("Wishlist", wisglistSchema);

module.exports = Wishlist;
