import reviewModel from "../models/ReviewModel.js";
import menuItemModel from "../models/menuItemModel.js";


export const createReview = async(req,res) => {
    try {
        const {ItemId, rating, text, RestaurantId} = req.body;
        const userId = req.user._id;
        
        const newReview = new reviewModel({
            userId,
            RestaurantId,
            ItemId,
            rating,
            text
        });

        await newReview.save();

        const updateItem = await menuItemModel.findById(ItemId);
        if (!updateItem) {
            return res.status(400).json({error: "Product not found"});
        }

        updateItem.reviews.push(newReview._id);
        await updateItem.save();

        res.status(200).json(newReview);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in create review "+error.message});
    }
};

export const getItemReview = async(req,res) => {
    try {
        const {itemId} = req.params;
        const allReviews = await reviewModel.find({ItemId : itemId})
        .sort({createdAt: -1})
        .populate({path: 'userId', select: "_id fullName profilePic"});
        if (!allReviews) {
            return res.status(400).json({error: "Reviews not found"});
        }

        res.status(200).json(allReviews);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get reviews by item id "+error.message});
    }
}

export const getRestaurantItemsReviews = async(req, res) => {
    try {
        const RestaurantId = req.restaurant._id;
        const reviews = await reviewModel.find({RestaurantId})
        .sort({createdAt: -1})
        .populate({path: 'userId', select: "_id fullName profilePic"})
        .populate({path: 'ItemId', select: "_id category itemName image"})
        if (!reviews) {
            return res.status(400).json({error: "Reviews not found."});
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get restaurant items reviews "+error.message});
    }
}

export const deleteReview = async(req,res) => {
    try {
        const {reviewId, ItemId} = req.body;

        const deleteReviews = await reviewModel.findByIdAndDelete(reviewId);
        if (!deleteReviews) {
            return res.status(404).json({error: "Review not found"});
        }        
        
        const updateItem = await menuItemModel.findById(ItemId);
        if (!updateItem) {
            return res.status(404).json({error: "Item not found"});
        }
        
        if (updateItem.reviews.includes(reviewId)) {
            updateItem.reviews = updateItem.reviews.filter(id => id.toString() !== reviewId.toString());
            await updateItem.save();
        }

        res.status(200).json({ message: "Review deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in delete review "+error.message});
    }
};