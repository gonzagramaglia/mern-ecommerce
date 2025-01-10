import userModel from "../models/user.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // userId and itemId exist
    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Item ID are required.",
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    let cartData = userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });
    res.status(200).json({ success: true, message: "Added To Cart" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // userId and itemId exist
    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Item ID are required.",
      });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    let cartData = userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Removed from Cart" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // userId and itemId exist
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    let cartData = userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addToCart, removeFromCart, getCart };
