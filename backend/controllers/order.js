import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/envar.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "ars",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "ars",
        product_data: { name: "Delivery Charges" },
        unit_amount: 300 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  if (!orderId || typeof success === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Invalid request: 'orderId' and 'success' are required",
    });
  }

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(202).json({ success: false, message: "Not Paid" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// user orders for frontend
const fetchUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

export { placeOrder, verifyOrder, fetchUserOrders };
