import restaurantModel from "../models/restaurantModel.js";
import jwt from "jsonwebtoken";

const RestaurantProtectedRoute = async(req,res,next) => {
    try {
        const token = req.cookies['restaurant-token'];
        if (!token) return res.status(401).json({error: "Unauthorized"});

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const restaurant = await restaurantModel.findOne({_id:decoded.restaurantId}).select("-password");
        req.restaurant = restaurant;
        next();
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log("Unexpected error: ", err.message);
    }
}

export default RestaurantProtectedRoute;