import express from "express";
import RestaurantProtectedRoute from '../middleware/RestaurantProtectedRoute.js';
import { getMenuItems, updateMenuItem, uploadMenuItem, deleteMenuItem} from "../controllers/MenuItemController.js";

const router = express.Router();

router.post('/upload-items', RestaurantProtectedRoute, uploadMenuItem);
router.get('/get-menu-items', RestaurantProtectedRoute, getMenuItems);
router.put('/update-item/:id', RestaurantProtectedRoute, updateMenuItem);
router.delete('/delete-item/:id', RestaurantProtectedRoute, deleteMenuItem);

export default router;