import orderModel from "../models/orderModel.js";

export const GetAllUserOrders = async(req,res) => {
    try {
        const userId = req.user._id;
        if(!userId) return res.status(404).json({ error: "UserId not found" });
        
        const orders = await orderModel.find({userId}).sort({createdAt: -1});

        if (!orders) {
            return res.status(404).json({error: "Order not found"});
        }

        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res
          .status(500)
          .json({ error: "Error in get order " + error.message });
    }
}

export const GetAllRestaurantOrders = async(req,res) => {
    try {
        const restaurantId = req.restaurant._id;
        if(!restaurantId) return res.status(404).json({ error: "UserId not found" });
        
        const orders = await orderModel
        .find({
            itemsDetails: {
                $elemMatch: {
                    "itemId.restaurantId": restaurantId.toString()
                }
            }
        })
        .sort({createdAt: -1});

        if (!orders) {
            return res.status(404).json({error: "Order not found"});
        }

        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res
          .status(500)
          .json({ error: "Error in get order " + error.message });
    }
}

export const updateStatus = async(req,res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        
        if(!orderId) return res.status(404).json({ error: "OrderId not found" });
        if(!status) return res.status(404).json({ error: "Status not found" });
        
        const updateOrder = await orderModel.findById(orderId);
        if (!updateOrder) {
            return res.status(404).json({error: "Order not found"});
        }

        updateOrder.status = status || updateOrder.status;
        await updateOrder.save();

        res.status(200).json(updateOrder);
    } catch (error) {
        console.log(error.message);
        res
          .status(500)
          .json({ error: "Error in update order status " + error.message });
    }
}