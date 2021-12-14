const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const User = require("../Model/Auth");
const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// @desc    Get all user
// @route   Get /api/users
// @access  Private/Admin
const getUsers = catchAsyncError(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc    Signup a new user
// @route   POST /api/users
// @access  Private
// sendgrid

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signupUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  } else {
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Sign in Authentication",
      html: `
        <h1>Sign in Authentication</h1>
        <p>Click on the link below to confirm your valid email address here.</p>
        <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
        <p>Cheers,</p>
        <h3>Precision Ordnance</h3>
      `,
    };
    try {
      sgMail.send(emailData).then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      });
      res.status(201).json({
        message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
      });
    } catch (error) {
      return new ErrorHandler("Email not sent", 400);
    }
  }
});

// @desc    Activation a new user
// @route   POST /api/users/account-activation
// @access  Public

const activateUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          return next(new ErrorHandler("Expired link. Signup again", 401));
        }

        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            res.status(401);
            return next(
              new ErrorHandler(
                "Error saving user in database. Try signup again",
                400
              )
            );
          }
          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
          });
        });
      }
    );
  } else {
    return next(new ErrorHandler("Something went wrong. Try again", 400));
  }
});

// @desc    Signin a user
// @route   POST /api/users/signin
// @access  Public
const signinUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.authenticate(password))) {
    // / Generate token and send to the client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
});

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new ErrorHandler("User not found", 400));
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.hashed_password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } else {
    return next(new ErrorHandler("User not found", 400));
  }
});

module.exports = {
  signupUser,
  signinUser,
  activateUser,
  getUsers,
  updateUserProfile,
  getUserProfile,
};
