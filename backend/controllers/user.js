import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";
import { JWT_SECRET } from "../config/envar.js";

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists in the database",
      });
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hasshing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { loginUser, registerUser };
