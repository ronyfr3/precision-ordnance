const express = require("express");
const router = express.Router();
const {
  getNotification,
  addNotications,
} = require("../controllers/Foreground");

router.get("/", getNotification);
router.post("/", addNotications);

module.exports = router;