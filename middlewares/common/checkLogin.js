const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    let cookies =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    const token = cookies ? cookies[process.env.COOKIE_NAME] : null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Authentication Failed",
    });
  }
};

module.exports = checkLogin;
