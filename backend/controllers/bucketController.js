import bucketModel from "../models/bucketModel.js";
import menuItemModel from "../models/menuItemModel.js";

export const addToBucket = async(req,res) => {
    try {
        const {itemId} = req.body;
        const userId = req.user._id;
        
        if (!itemId) return res.status(404).json({error: "ItemId not found"});
        if (!userId) return res.status(404).json({error: "userId not found"});

        const existsItem = await bucketModel.findOne({ itemId, userId});
        
        if (existsItem) {
            existsItem.quantity = existsItem.quantity + 1;
            await existsItem.save();
            
            res.status(200).json(existsItem);

        } else {
            const menuItem = await menuItemModel.findById(itemId);
            if (!menuItem) return res.status(404).json({error: "MenuItem not found"});

            const newBucket = new bucketModel({
                itemId,
                userId,
                price: menuItem.price,
            });
    
            await newBucket.save();

            res.status(200).json(newBucket);
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in add in bucket "+error.message});
    }
}

export const getBucketItems = async(req,res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(404).json({error: "userId not found"});

        const menuItems = await bucketModel.find({userId})
        .sort({createdAt: -1})
        .populate({path: 'itemId', select: "_id itemName category image isVeg deliveryTime restaurantId price"})

        if(!menuItems) return res.status(404).json({error: "Menu items not found"});
        
        res.status(200).json(menuItems);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get items "+error.message});
    }
}

export const updateQuantity = async(req,res) => {
    try {
        const {bucketId, quantity} = req.body;
        if (!bucketId) return res.status(404).json({error: "BucketId not found"});
        if (!quantity) return res.status(404).json({error: "Quantity not found"});

        const updateBucketItemQty = await bucketModel.findById(bucketId);
        if (!updateBucketItemQty) {
            return res.status(400).json({error: "Bucket item not found"});
        }
        
        updateBucketItemQty.quantity = quantity || updateBucketItemQty.quantity;
        await updateBucketItemQty.save();
    
        res.status(200).json(updateBucketItemQty);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get cart "+error.message});
    }
}

export const DeleteBucketItem = async(req,res) => {
    try {
        const {bucketId} = req.body;
        if (!bucketId) return res.status(404).json({error: "bucketId not found"});

        const deleteBucketItem = await bucketModel.findByIdAndDelete(bucketId);
        if (!deleteBucketItem) {
            return res.status(404).json({error: "Bucket item not found"});
        }
        res.status(200).json({message: "Bucket item removed"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in delete cart "+error.message});
    }
}

export const DeleteUserBuckets = async(req,res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(404).json({error: "userId not found"});

        const deleteBucketItems = await bucketModel.deleteMany({ userId: userId });

        if (deleteBucketItems.deletedCount === 0) {
          return res.status(404).json({ message: 'No bucket items found for this user.' });
        }
    
        res.status(200).json({ message: 'Bucket cleared successfully.' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in delete user buckets "+error.message});
    }
}
