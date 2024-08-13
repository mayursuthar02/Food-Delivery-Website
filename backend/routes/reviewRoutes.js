import express from 'express';
import protectRoute from '../middleware/protectRoute.js'
import RestaurantProtectedRoute from '../middleware/RestaurantProtectedRoute.js'
import { createReview, deleteReview, getItemReview, getRestaurantItemsReviews } from '../controllers/reviewController.js';
const router = express.Router();

router.post('/create', protectRoute, createReview);
router.get('/by-item/:itemId', getItemReview);
router.get('/get-restaurant-items-reviews',RestaurantProtectedRoute, getRestaurantItemsReviews);
router.post('/delete',RestaurantProtectedRoute, deleteReview);

export default router;