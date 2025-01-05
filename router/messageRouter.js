const express = require("express");
const {
  addMessage,
  getMessages,
  editMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

router.post("/api/message", checkLogin, addMessage);
router.get("/api/message/:id", checkLogin, getMessages);
router.put("/api/message/:id", checkLogin, editMessage);
router.delete("/api/message/:id", checkLogin, deleteMessage);

module.exports = router;
