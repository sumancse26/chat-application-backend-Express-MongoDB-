const express = require("express");
const { getUsers, createUser } = require("../controllers/usersController");
const fileUpload = require("../middlewares/fileUpload/fileUpload.js");
const {
  userValidator,
  userValidationResultHandler,
} = require("../middlewares/userValidator.js");

const router = express.Router();

router.get("/user", getUsers);
router.post(
  "/user",
  fileUpload,
  userValidator,
  userValidationResultHandler,
  createUser
);

module.exports = router;
