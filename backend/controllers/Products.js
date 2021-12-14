const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../Model/Products");
const APIfeatures = require("../Elastic/Elastic");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = catchAsyncError(async (req, res, next) => {
  const features = new APIfeatures(Product.find(), req.query)
    .filtering()
    .sorting();
  const allProducts = await features.query;
  if (!allProducts) return next(new ErrorHandler("Products not found", 400));
  res.status(200).json(allProducts);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("user");

  if (product) {
    res.status(200).json(product);
  } else {
    return next(new ErrorHandler("Product not found", 400));
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed" });
  } else {
    return next(new ErrorHandler("Product not found", 400));
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = catchAsyncError(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    category: req.body.category,
    newArrival: req.body.newarrival,
    subcategory: req.body.subcategory,
    brand: req.body.brand,
    productInfo: req.body.productInfo,
    numReviews: 0,
    files: req.body.files,
  });

  const createdProduct = await product.save();
  res
    .status(201)
    .json({ createdProduct, message: "product created successfully" });
});

//reviews
const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReview) {
      return next(new ErrorHandler("Product already reviewed", 400));
    }
    const review = {
      rating: Number(rating),
      comment,
      name: req.user.name,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    return next(new ErrorHandler("Product not found", 400));
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = catchAsyncError(async (req, res, next) => {
  const { category, subcategory, brand, productInfo, newArrival, files } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.newArrival = newArrival;
    product.files = files;
    product.category = category;
    product.subcategory = subcategory;
    product.brand = brand;
    product.productInfo = productInfo;

    const updatedProduct = await product.save();
    res.json({ updatedProduct, message: "product updated successfully" });
  } else {
    return next(new ErrorHandler("Product not found", 400));
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
