import Stripe from 'stripe';
import dotenv from 'dotenv';
import orderModel from '../models/orderModel.js';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
if (!stripe) {
    throw new Error("The STRIPE_SECRET_KEY environment variable is not set.");
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_END_POINT_SECRET;

if (!endpointSecret) {
  throw new Error("The STRIPE_END_POINT_SECRET environment variable is not set.");
}


// Stripe Checkout
export const stripeCheckout = async (req, res) => {
    try {
      const { items, totalAmount} = req.body;
      const email = req.user.email;
      const id = req.user._id;

      if(!items) return res.status(404).json({ error: "items not found" });
  
      // Store Data
      const currency = "inr";
      const lineItems = items.map((item) => {
        const unitAmount = Math.round(item.price * 100);
        return {
          price_data: {
            currency: currency,
            product_data: {
              name: item.itemId.itemName,
              images: [item.itemId.image],
            //   metadata: {
            //     productId: product.productId._id.toString(),
            //     vendorId: product.productId.vendorId.toString(),
            //     size: product.size,
            //     color: product.productId.color,
            //     discount: product.productId.discount,
            //     brandName: product.productId.brandName,
            //   },
            },
            unit_amount: unitAmount,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      });
  
      // Create session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        billing_address_collection: "required",
        submit_type: "pay",
        customer_email: req.user.email,
        metadata: {
          userId : req.user._id.toString(),
        },
        line_items: lineItems,
        success_url: `${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancle`,
        shipping_address_collection: {
          allowed_countries: ["IN"], // Allow only India for shipping
        },
      });
  
      // Store session id 
      if(!session.id) {
        console.log("Error Session id not found");
        return;   
      }

      // Order Create
      const newOrder = new orderModel({
        itemsDetails: items,
        email,
        userId: id,
        totalAmount,
        sessionId: session.id
      });

      await newOrder.save();
      
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Error in stripe checkout " + error.message });
    }
  };