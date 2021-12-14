const ErrorHandler = require("../middleware/errorMiddleware");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../Model/Orders");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//create-order
const addOrderItems = catchAsyncError(async (req, res, next) => {
  const { userInfo, orderItems, shippingAddress, shippingPrice, totalPrice } =
    req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorHandler("No order items", 400));
  }
  const order = new Order({
    user: req.user._id,
    userInfo,
    orderItems,
    shippingAddress,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  const emailData = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Order Summary",
    html: `
      <h1>Order Summary</h1>
      <p>G’Day ${user.first_name}</p>
      <p>Here’s your attached order summary:</p> 
      <p>We wish you the best hunting experience with the new addition to your collection. Hunting on!</p>  
      <p>Regards,</p>   
      <p>Team Precision Ordnance</p>  
      <hr />
      You have received an order.  
      <h4>Order ID:</h4> 
      <p>Date Added: ${new Date(Date.now()).toLocaleString()}</p>
      <p>Time: ${new Date(Date.now()).toLocaleString()}</p> 
      <p>Order Status: Pending</p>
      <p>Products</p>
      ${orderItems.map((item) => item)}
      <p>Total: ${totalPrice}</p>
    `,
  };
  sgMail.send(emailData).then((response) => {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  });
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    return next(new ErrorHandler("Order not found", 400));
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    return next(new ErrorHandler("Order not found", 400));
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    return next(new ErrorHandler("Order not found", 400));
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user", "name email"
  );
  if (!orders) return next(new ErrorHandler("Orders not found", 400));
  console.log("order", orders);
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "id name");
  if (!orders) return next(new ErrorHandler("Orders not found", 400));
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
