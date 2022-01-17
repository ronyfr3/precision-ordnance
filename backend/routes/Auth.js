const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
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
  hello,
} = require("../controllers/Auth");
const {
  runValidation,
  userRegisterValidation,
  userSigninValidation,
} = require("../validators/userValidation");

const router = express.Router();

// router.get("/", protect, admin, getUsers);
// router.post("/", userRegisterValidation, runValidation, signupUser);

// router.post("/signin", userRegisterValidation, runValidation, signinUser);

// router.post("/account-activation", activateUser);

// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);
// // router.patch("/profile", protect, updateUserProfile);

// // router.post("/", userRegisterValidation, runValidation, signupUser);
// // router.get("/", protect, getUsers);

// router.get("/abc/:id", getUserById);
// router.put("/abcdsafsdf/:id", updateUser);
// router.delete("asdfdfsdf/:id", deleteUser);
// router.post("/signin", userSigninValidation, runValidation, signinUser);
// router.post("/google", googleLogin);
// router.post("/account-activation", activateUser);

// router.get("/asdfasdf", (req, res) => res.send("test"));
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
router.post("/google", googleLogin);
router.route("/account-activation").post(activateUser);

module.exports = router;
