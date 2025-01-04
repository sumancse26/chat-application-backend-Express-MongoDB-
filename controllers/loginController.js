const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.query.username }, { mobile: req.query.username }],
    });

    const validPassword = await bcrypt.compare(
      req.query.password,
      user.password
    );

    const userInfo = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };

    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: process.env.JWT_EXPIRY,
      httpOnly: true,
      signed: true,
    });

    res.json({
      status: 200,
      message: "User logged in successfully",
      userInfo: userInfo,
      token: token,
    });
  } catch (e) {
    res.json({
      status: 500,
      message: e.message,
    });
  }
};

module.exports = { login };
