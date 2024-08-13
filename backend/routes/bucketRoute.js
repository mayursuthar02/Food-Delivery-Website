import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { addToBucket, DeleteBucketItem, DeleteUserBuckets, getBucketItems, updateQuantity } from '../controllers/bucketController.js';
const router = express.Router();

router.post('/add-to-bucket', protectRoute, addToBucket);
router.get('/get-bucket-items', protectRoute, getBucketItems);
router.put('/update-quantity', protectRoute, updateQuantity);
router.delete('/delete-bucket-item', protectRoute, DeleteBucketItem);
router.delete('/delete-user-bucket-items', protectRoute, DeleteUserBuckets);

export default router;