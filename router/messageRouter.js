const express = require("express");
const {
  addMessage,
  getMessages,
  editMessage,
  deleteMessage,
  addMessageWithConversation,
} = require("../controllers/messageController");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

router.post("/api/message", checkLogin, addMessage);
router.post(
  "/api/add-message-with-conversation",
  checkLogin,
  addMessageWithConversation
);
router.get("/api/message/:id", checkLogin, getMessages);
router.put("/api/message/:id", checkLogin, editMessage);
router.delete("/api/message/:id", checkLogin, deleteMessage);

module.exports = router;
