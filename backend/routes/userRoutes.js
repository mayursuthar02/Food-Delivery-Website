import express from 'express';
import { loginUser, SignupUser } from '../controllers/userController.js';


const router = express.Router();


router.post('/signup', SignupUser);
router.post('/login', loginUser);


export default router;