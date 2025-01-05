const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    //
  } catch (e) {
    res.json({
      status: 500,
      message: e.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const fileNmae =
      req.files && Object.keys(req?.files).length > 0
        ? req.files.avatar[0].filename
        : null;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let data = {};

    if (fileNmae) {
      data = await {
        ...req.body,
        password: hashPassword,
        avatar: fileNmae,
      };
    } else {
      data = await {
        ...req.body,
        password: hashPassword,
      };
    }

    const user = new User(data);
    const savedUser = await user.save();
    return res.json({
      status: 200,
      id: savedUser._id,
      message: "User created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

module.exports = { getUsers, createUser };
