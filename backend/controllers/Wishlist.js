const express = require("express");
const Wishlist = require("../Model/Wishlist");
const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");

const createWishlist = catchAsyncError(async (req, res) => {
  const { products } = req.body;
  const wishlist = new Wishlist({
    products,
    user: req.user._id,
  });
  const createdWishlist = await wishlist.save();
  res
    .status(201)
    .json({ createdWishlist, message: "wishlist created successfully" });
});

const getWishlist = catchAsyncError(async (req, res, next) => {
  const allWishlists = await Wishlist.find();
  if (!allWishlists) return next(new ErrorHandler("something went wrong", 400));
  res.status(200).json(allWishlists);
});

module.exports = { createWishlist, getWishlist };
