import express from "express";
import RestaurantProtectedRoute from '../middleware/RestaurantProtectedRoute.js';
import { getMenuItems, updateMenuItem, uploadMenuItem, deleteMenuItem, getAllItems, getItem, getRestaurantItems, getItemsCategories, getItemsByCategory} from "../controllers/MenuItemController.js";

const router = express.Router();

// Restaurant Side
router.post('/upload-items', RestaurantProtectedRoute, uploadMenuItem);
router.get('/get-menu-items', RestaurantProtectedRoute, getMenuItems);
router.put('/update-item/:id', RestaurantProtectedRoute, updateMenuItem);
router.delete('/delete-item/:id', RestaurantProtectedRoute, deleteMenuItem);

// Client Side
router.get('/get-all-items', getAllItems);
router.get('/get-item/:id', getItem);
router.get('/get-restaurant-item/:id', getRestaurantItems);
router.get('/get-item-categories/:id', getItemsCategories);
router.get('/get-item-by-category/:category', getItemsByCategory);
export default router;