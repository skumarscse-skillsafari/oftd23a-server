import {
  signup,
  signin,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/usersController.js";
import express from "express";
const router = express.Router();
// SignUP
// http://localhost:5000/api/v1/users/signup
router.post("/signup", signup);

// SignIn
// http://localhost:5000/api/v1/users/signin
router.post("/signin", signin);

// GetAllUsers
// http://localhost:5000/api/v1/users
router.get("/", getAllUsers);

// GetUserByID
// http://localhost:5000/api/v1/users/:id
router.get("/:id", getUserById);

// UpdateUserByID
// http://localhost:5000/api/v1/users/:id
router.put("/:id", updateUserById);

// DeleteUserByID
// http://localhost:5000/api/v1/users/:id
router.delete("/:id", deleteUserById);

export default router;
