import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

// SignUP
export const signup = async (req, res) => {
  try {
    // const { username, email } = req.body;
    const encryptedPwd = await bcrypt.hash(req.body.password, 12);
    // const newUserObj = {
    //   username: username,
    //   email: email,
    //   password: encryptedPwd,
    //   confirmPassword: encryptedPwd,
    // };
    // const user = await User.create(newUserObj); // {username:, email:, password: , confirmPassword: }
    const user = await User.create({
      ...req.body,
      password: encryptedPwd,
      confirmPassword: encryptedPwd,
    }); // {username:, email:, password: , confirmPassword: }
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

// SignIn
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body; // {email: , password: }
    const findUser = await User.findOne({ email: email });
    // console.log(findUser);
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, message: `No user with the email: ${email}` });
    const checkPwd = await bcrypt.compare(password, findUser.password);
    console.log(checkPwd);
    if (!checkPwd)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { email: findUser.email, id: findUser._id },
      SECRET,
      { expiresIn: "1hr" }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "User LoggedIn successfully",
        token: token,
      });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

// GetAllUsers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
// GetUserByID
// http://localhost:5000/api/v1/users/:id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // {id: ...}
    const getUser = await User.findById(id);
    if (!getUser)
      return res
        .status(404)
        .json({ success: false, message: `No user with the id: ${id}` });
    res.status(200).json({ success: true, data: getUser });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

// UpdateUserByID
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(404).json({
        success: false,
        message: "Password and confirm password not same",
      });
    const encryptedPwd = await bcrypt.hash(req.body.password, 12);
    const result = await User.findByIdAndUpdate(
      id,
      { ...req.body, password: encryptedPwd, confirmPassword: encryptedPwd },
      { new: true }
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

// DeleteUserByID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: `No user with the id: ${id}` });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
