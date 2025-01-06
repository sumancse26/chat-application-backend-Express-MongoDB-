const User = require("../models/User");
const bcrypt = require("bcrypt");
const { signJwtToken } = require("../middlewares/common/jwtToken.js");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.query.username }, { mobile: req.query.username }],
    });

    const validPassword = await bcrypt.compare(
      req.query.password,
      user.password
    );

    const token = signJwtToken(user);

    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: process.env.JWT_EXPIRY,
      httpOnly: true,
      signed: true,
    });

    res.json({
      status: 200,
      message: "User logged in successfully",
      token: token,
    });
  } catch (e) {
    res.json({
      status: 500,
      message: "Login Failed",
    });
  }
};

module.exports = { login };
