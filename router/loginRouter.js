const express = require("express");
const { login } = require("../controllers/loginController");
const {
  loginValidator,
  loginValidationResultHandler,
} = require("../middlewares/login/loginValidator.js");

const router = express.Router();

router.get("/api/login", loginValidator, loginValidationResultHandler, login);

module.exports = router;
