const express = require("express");
const {
  addMessage,
  getMessages,
  editMessage,
  deleteMessage,
} = require("../controllers/messageController");
const checkLogin = require("../middlewares/common/checkLogin");

const router = express.Router();

router.post("/message", checkLogin, addMessage);
router.get("/message/:id", checkLogin, getMessages);
router.put("/message/:id", checkLogin, editMessage);
router.delete("/message/:id", checkLogin, deleteMessage);

module.exports = router;
