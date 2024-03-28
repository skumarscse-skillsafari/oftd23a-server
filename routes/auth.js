import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

const auth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user or Login again" });
    next();
  });
};

export default auth;
