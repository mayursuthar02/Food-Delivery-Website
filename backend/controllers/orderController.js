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