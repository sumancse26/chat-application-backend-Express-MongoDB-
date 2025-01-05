const express = require("express");
const {
  getInboxs,
  addConversation,
  deleteConversation,
} = require("../controllers/inboxController");
const checkLogin = require("../middlewares/common/checkLogin");

const router = express.Router();

router.get("/inbox", checkLogin, getInboxs);
router.post("/inbox", checkLogin, addConversation);
router.delete("/inbox/:id", checkLogin, deleteConversation);

module.exports = router;
