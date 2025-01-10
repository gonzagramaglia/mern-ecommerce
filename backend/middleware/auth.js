import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envar.js";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login" });
  }
  try {
    const token_decoded = jwt.verify(token, JWT_SECRET);
    req.body.userId = token_decoded.id;
    next();
  } catch (err) {
    console.err(err.message);
    res.status(403).json({ success: false, message: err.message });
  }
};

export default authMiddleware;
