const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const User = require("../Model/Auth");
const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");
const client = new OAuth2(
  "779648521547-gjlsus2l9aud4kosqdtc5gu5icmumqlp.apps.googleusercontent.com"
);

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

  console.log("user", user);

  if (user && (await user.authenticate(password))) {
    // / Generate token and send to the client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
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
// @route   GET /api/users/profile
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
  res.send("pass");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
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

// @desc    Get single profile
// @route   Get /api/users/:id
// @access  Private
const getUserById = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user);

  if (user) {
    res.json(user);
  } else {
    return next(new ErrorHandler("User not found", 400));
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  //without await it works as expexted
  //no need to use upsert:true , if user not found it will create a new one
  User.findByIdAndUpdate(id, req.body, {
    new: true
  })
    .then((data) => {
      if (!data) {
        return next(
          new ErrorHandler(
            `Failed to update user with id=${id}.`,
            400
          )
        );
      } else
        res.status(200).json({
          data,
          message: "user was updated successfully.",
        });
    })
    .catch((err) => {
      return next(
        new ErrorHandler(
          `Error occured while updating user with id=${id}.`,
          500
        )
      );
    });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    return next(new ErrorHandler("User not found", 400));
  }
});

// @desc    Google signin
// @route   POST /api/users/google
// @access  Public
const googleLogin = catchAsyncError(async (req, res, next) => {
  const { tokenId } = req.body;
  if (!tokenId)
    return next(new ErrorHandler("you need to provide a token id", 400));

  const verify = await client.verifyIdToken({
    idToken: tokenId,
    audience:
      "779648521547-gjlsus2l9aud4kosqdtc5gu5icmumqlp.apps.googleusercontent.com", //google client_id
  });
  const { email_verified, email, name } = verify.payload;
  // console.log(email); //google pop up selected email
  // console.log("email_verified", email_verified); //return true / false

  if (!email_verified)
    return res.status(400).json({ msg: "Email verification failed." });

  const user = await User.findOne({ email });

  const password = email + "123456";
  // const hashed_password = await bcrypt.hash(password, 12);

  if (user && (await user.authenticate(password))) {
    // const isMatch = await bcrypt.compare(password, user.hashed_password);
    // if (!isMatch) return next(new ErrorHandler("password not match", 400));

    const refresh_token = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      secure: true,
      maxAge: 180000,
    });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: refresh_token,
    });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });

    const userData = await newUser.save();

    const refresh_token = createRefreshToken({ id: userData._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      secure: true,
      maxAge: 180000,
    });

    res.json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin,
      token: refresh_token,
    });
  }
});

//user/facebook_login
const facebookLogin = catchAsyncError(async (req, res, next) => {
  const { accessToken, userID } = req.body;
  //developers.facebook.com/docs/graph-api/overview/ -->versions curl -i X GET \
  const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });

  const { email, name, picture } = data;

  const password = email + "123456";
  const hashed_password = await bcrypt.hash(password, 12);

  const user = await User.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Password is incorrect.", 400));

    const refresh_token = createRefreshToken({ id: user._id });
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      secure: true,
      maxAge: 180000,
    });

    res.status(200).json({
      message: "Login Successfull",
      refreshToken: refresh_token,
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    const newUser = new Users({
      name,
      email,
      password: passwordHash,
      avatar: picture.data.url,
    });

    const fbUserData = await newUser.save();

    const refresh_token = createRefreshToken({ id: newUser._id });
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      secure: true,
      maxAge: 180000,
    });

    res.status(200).json({
      message: "Login Success",
      refreshToken: refresh_token,
      data: {
        name: fbUserData.name,
        email: fbUserData.email,
        avatar: fbUserData.avatar,
        isAdmin: fbUserData.isAdmin,
      },
    });
  }
});

// function validateEmail(email) {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// }

// const createActivationToken = (payload) => {
//   return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
//     expiresIn: "3m",
//   });
// };

// const createAccessToken = (payload) => {
//   // return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//   return jwt.sign(payload, "123456", {
//     expiresIn: "3m",
//   });
// };

function createRefreshToken(payload) {
  //payload = user._id
  // return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  signupUser,
  signinUser,
  activateUser,
  getUsers,
  updateUserProfile,
  getUserProfile,
  getUserById,
  updateUser,
  deleteUser,
  googleLogin,
};
