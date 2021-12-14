const Subscription = require("../Model/Subscription");
const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");

const createSubscribe = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new ErrorHandler("Please enter an email address", 400));
  const Subscriptions = new Subscription({
    mail: email,
  });
  await Subscriptions.save();
  res.status(201).json({ message: "Thanks for subscribe" });
});

module.exports = {
  createSubscribe,
};
