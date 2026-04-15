const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
} = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "recruitix_secret_key";

// SIGNUP
const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findByEmail(
        email
      );

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await hashPassword(
        password
      );

    await User.create(
      email,
      hashedPassword,
      role
    );

    res.status(201).json({
      message:
        "Signup successful",
    });
  } catch (err) {
    console.error(
      "SIGNUP ERROR:",
      err
    );

    res.status(500).json({
      error:
        err.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findByEmail(
        email
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const isMatch =
      await comparePassword(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        user_id:
          user.user_id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    console.error(
      "LOGIN ERROR:",
      err
    );

    res.status(500).json({
      error:
        err.message,
    });
  }
};

module.exports = {
  signup,
  login,
};