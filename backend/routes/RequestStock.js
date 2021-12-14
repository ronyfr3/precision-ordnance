const express = require("express");
const router = express.Router();
const { RequestStock } = require("../controllers/RequestStock");

router.route("/").post(RequestStock);

module.exports = router;
