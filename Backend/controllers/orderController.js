import { Router } from "express";
import orderModel from "../models/ordermodel.js";
import userModel from "./../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId, // Ensure this is being passed correctly
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Adjust based on your currency multiplier
      },
      quantity: item.quantity,
    }));

    // Adding delivery charge as a separate item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 50 * 100, // Assuming Rs. 50 delivery charge
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Error in placeOrder:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};

const verifyOrders = async (req, res) => {
  const { ordeId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(ordeId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(ordeId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error" });
  }
};

//users ordres

const usersOders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: "Error" });
  }
};

// listing orders to admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// updating status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.ordeId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error at status" });
  }
};
export { placeOrder, verifyOrders, usersOders, listOrders, updateStatus };
