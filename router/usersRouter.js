const express = require("express");
const { createUser } = require("../controllers/usersController");
const fileUpload = require("../middlewares/fileUpload/fileUpload.js");
const {
  checkLogin,
  requireRole,
} = require("../middlewares/common/checkLogin.js");
const {
  userValidator,
  userValidationResultHandler,
} = require("../middlewares/userValidator.js");

const router = express.Router();

// router.get("/user", );
router.post(
  "/api/register",
  requireRole("admin"),
  fileUpload,
  userValidator,
  userValidationResultHandler,
  createUser
);

module.exports = router;
