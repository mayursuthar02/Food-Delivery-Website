import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import RestaurantProtectedRoute from "../middleware/RestaurantProtectedRoute.js";
import { GetAllRestaurantOrders, GetAllUserOrders, updateStatus } from "../controllers/orderController.js";
const router = express.Router();

router.get('/get-orders', protectRoute, GetAllUserOrders);
router.get('/get-restaurant-orders', RestaurantProtectedRoute, GetAllRestaurantOrders);
router.put('/update-status/:orderId', RestaurantProtectedRoute, updateStatus);

export default router;