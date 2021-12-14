const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  signupUser,
  signinUser,
  activateUser,
  getUsers,
  updateUserProfile,
  getUserProfile,
} = require("../controllers/Auth");
const {
  runValidation,
  userRegisterValidation,
  userSigninValidation,
} = require("../validators/userValidation");

const router = express.Router();

// router
//   .route("/")
//   .post(userRegisterValidation, runValidation, signupUser)
//   .get(protect, admin, getUsers);
// router.route("/signin").post(userSigninValidation, runValidation, signinUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router.route("/account-activation").post(activateUser);
router
  .route("/")
  .post(userRegisterValidation, runValidation, signupUser)
  .get(protect, admin, getUsers);
router.route("/signin").post(userSigninValidation, runValidation, signinUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/account-activation").post(activateUser);

module.exports = router;
