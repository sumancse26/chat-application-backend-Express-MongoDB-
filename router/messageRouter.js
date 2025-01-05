const express = require("express");
const { addMessage, getMessages } = require("../controllers/messageController");
const checkLogin = require("../middlewares/common/checkLogin");

const router = express.Router();

router.post("/message", checkLogin, addMessage);
router.get("/message/:id", checkLogin, getMessages);

module.exports = router;
