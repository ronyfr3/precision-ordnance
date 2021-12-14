const Foreground = require("../Model/ForegoundNotify");
const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");

const getNotification = catchAsyncError(async (req, res, next) => {
  const Notify = await Foreground.find();
  if (!Notify) return next(new ErrorHandler("Not Found", 400));
  res.status(200).json(Notify);
});

const addNotications = catchAsyncError(async (req, res) => {
  const { user, message, details } = req.body;
  const newNotications = new Foreground({
    user,
    message,
    details,
  });
  const createdNotification = await newNotications.save();
  res.status(201).json({ createdNotification });
});
module.exports = { getNotification, addNotications };
