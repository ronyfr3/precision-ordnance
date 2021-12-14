const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  mail: {
    type: String,
  },
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;