import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { GetAllUserOrders } from "../controllers/orderController.js";
const router = express.Router();

router.get('/get-orders', protectRoute, GetAllUserOrders)

export default router;