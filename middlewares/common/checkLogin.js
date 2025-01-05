const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, role, email } = decoded;
    req._id = _id;
    req.role = role;
    req.email = email;

    next();
  } catch (e) {
    next(
      res.status(500).json({
        status: 500,
        message: "Authentication Failed",
      })
    );
  }
};

module.exports = checkLogin;
