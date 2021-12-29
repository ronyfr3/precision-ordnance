const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
} = require("../controllers/Order");
const { protect, admin } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.route("/").post(protect, addOrderItems).get(getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById).delete(protect, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(updateOrderToDelivered);
// router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
// router.route('/myorders').get(protect, getMyOrders)
// router.route('/:id').get(protect, getOrderById)
// router.route('/:id/pay').put(protect, updateOrderToPaid)
// router.route('/:id/deliver').put(protect, updateOrderToDelivered)

module.exports = router;
