// routes/cart.router.js
const express = require('express');
const {cartModel} = require('../model/cart.model');

let cartRouter = express.Router();

// Define routes
cartRouter.get("/", async (req, res) => {
  const { userId } = req.body;  // Use query params instead of body for GET requests
  try {
    const cart_products = await cartModel.find({ userId: userId }).populate('productId');
    res.send({ "message": "Successfully retrieved the cart data from database", data: cart_products });
  } catch (error) {
    res.send({ "Error-message": error });
  }
});

cartRouter.post("/add-to-cart", async (req, res) => {
  const { productId, quantity, userId } = req.body;

  if (!productId || !quantity || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newCart = new cartModel({
      productId,
      quantity,
      userId: userId
    });
    const aaa= await newCart.save();
    res.json({ "message": "Successfully added product to cart" ,aaa});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = cartRouter;  
