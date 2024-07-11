import express from 'express';
import { loginUser, SignupUser, UpdateRestaurantProfile } from '../controllers/restaurantController.js';
import RestaurantProtectedRoute from '../middleware/RestaurantProtectedRoute.js';

const router = express.Router();


router.post('/signup', SignupUser);
router.post('/login', loginUser);
router.put('/update-restaurant-profile', RestaurantProtectedRoute, UpdateRestaurantProfile);


export default router;