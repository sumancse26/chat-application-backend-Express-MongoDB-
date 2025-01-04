const express = require("express");
const {
  getInboxs,
  addConversation,
} = require("../controllers/inboxController");
const checkLogin = require("../middlewares/common/checkLogin");

const router = express.Router();

router.get("/inbox", checkLogin, getInboxs);
router.post("/inbox", checkLogin, addConversation);

module.exports = router;
