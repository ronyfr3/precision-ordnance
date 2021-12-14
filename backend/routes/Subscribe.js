const express = require("express");
const router = express.Router();
const {
    createSubscribe,
} = require("../controllers/Subscription");

router.route("/").post(createSubscribe);

module.exports = router;