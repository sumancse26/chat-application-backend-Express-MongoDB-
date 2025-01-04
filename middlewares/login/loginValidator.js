const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("username").isEmail().withMessage("Email is required").trim(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),
];

const loginValidationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length > 0) {
    return res.status(400).json({
      status: 400,
      errors: mappedErrors,
    });
  }
  next();
};
module.exports = { loginValidator, loginValidationResultHandler };
