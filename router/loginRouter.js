const express = require("express");
const { getLogin } = require("../controllers/loginController");

const router = express.Router();

router.get("/", getLogin);

module.exports = router;
