const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String },
    rating: {
      type: Number,
      default: 0,
    },
    comment: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    files: {
      type: mongoose.Schema.Types.Mixed,
    },
    newArrival: { type: Boolean, default: false },
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    brand: {
      type: String,
    },
    productInfo: {
      info: {
        name: {
          type: Array,
        },
        values1: {
          type: Array,
        },
        values2: {
          type: Array,
        },
      },
      title: {
        type: String,
      },
      price: {
        type: String,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      shortdescription: {
        type: String,
      },
      longdescription: {
        type: String,
      },
      countInStock: {
        type: String,
        default: 0,
      },
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
