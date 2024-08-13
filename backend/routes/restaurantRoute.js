import express from 'express';
import { GetRestaurantData, loginUser, logout, SignupUser, UpdateRestaurantProfile } from '../controllers/restaurantController.js';
import RestaurantProtectedRoute from '../middleware/RestaurantProtectedRoute.js';

const router = express.Router();


router.post('/signup', SignupUser);
router.post('/login', loginUser);
router.put('/update-restaurant-profile', RestaurantProtectedRoute, UpdateRestaurantProfile);
router.post('/logout', RestaurantProtectedRoute, logout);

// Client side
router.get('/get-data/:id', GetRestaurantData);


export default router;