const User = require("../models/User");
const bcrypt = require("bcrypt");
const { signJwtToken } = require("../middlewares/common/jwtToken.js");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    }).select({ __v: 0 });

    const validPassword = await bcrypt.compare(
      req.body.password,
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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        updatedAt: user.updatedAt,
      },
    });
  } catch (e) {
    res.json({
      status: 500,
      message: "Login Failed",
    });
  }
};

module.exports = { login };
