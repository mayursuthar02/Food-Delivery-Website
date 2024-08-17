import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    itemsDetails: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // restaurantId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Restaurant',
    //   default: null,
    // },
    status: {
      type: String,
      default: "pending",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    sessionId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
