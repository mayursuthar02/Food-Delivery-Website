import express from 'express';
import { loginUser, logout, SignupUser, updateUserProfile } from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js'


const router = express.Router();


router.post('/signup', SignupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logout);
router.put('/update', protectRoute, updateUserProfile);


export default router;