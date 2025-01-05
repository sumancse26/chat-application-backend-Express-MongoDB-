const express = require("express");
const {
  getInboxs,
  addConversation,
  deleteConversation,
} = require("../controllers/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

router.get("/api/inbox", checkLogin, getInboxs);
router.post("/api/inbox", checkLogin, addConversation);
router.delete("/api/inbox/:id", checkLogin, deleteConversation);

module.exports = router;
