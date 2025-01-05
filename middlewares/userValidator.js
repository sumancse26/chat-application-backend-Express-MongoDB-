const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const path = require("path");
const { unlink } = require("fs");

const userValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isAlpha("en-US", { ignore: " _" })
    .withMessage("Name must not contain special characters")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Email is required")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already exists");
        }
      } catch (err) {
        console.log(err);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .trim(),

  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .isLength({ min: 11, max: 16 })
    .withMessage("Invalid mobile number")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          return Promise.reject("Mobile number already exists");
        }
      } catch (err) {
        console.log(err);
      }
    }),
];

const userValidationResultHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length > 0) {
    if (req.files && Object.keys(req?.files).length > 0) {
      let avatarFile = await req.files.avatar[0];
      // Unlink uploaded files if present
      if (avatarFile) {
        const { filename } = avatarFile;
        const filePath = path.join(__dirname, `../public/uploads/${filename}`);
        unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
          }
        });
      }
    }

    // Return validation errors
    return res.status(400).json({
      status: 400,
      errors: mappedErrors,
    });
  }
  next();
};

module.exports = { userValidator, userValidationResultHandler };
