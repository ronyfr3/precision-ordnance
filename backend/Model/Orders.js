const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId },
    userInfo: {
      first_name: { type: String },
      last_name: { type: String },
      email: { type: String },
      mobile: { type: String },
    },
    orderItems: [
      {
        title: { type: String },
        category: { type: String },
        subcategory: { type: String },
        longdescription: { type: String },
        shortdescription: { type: String },
        names: { type: Array },
        values1: { type: Array },
        values2: { type: Array },
        image: { type: Array },
        qty: { type: String },
        price: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      street: { type: String },
      state: { type: String },
      country: { type: String },
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    // isPaid: {
    //   type: Boolean,

    //   default: false,
    // },

    // paidAt: {
    //   type: Date,
    //   default: Date.now()
    // },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    // deliveredAt: {
    //   type: Date,
    // },
  },

  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
