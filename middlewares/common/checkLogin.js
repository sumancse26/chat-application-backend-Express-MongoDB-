const { verifyJwtToken } = require("./jwtToken");

const checkLogin = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    const decoded = verifyJwtToken(token);
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

const requireRole = (role) => (req, res, next) => {
  if (req.role === role) {
    next();
  } else {
    next(
      res.status(401).json({
        status: 401,
        message: "You are not authorized!",
      })
    );
  }
};

module.exports = { checkLogin, requireRole };
