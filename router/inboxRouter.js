const express = require("express");
const { getInboxs } = require("../controllers/inboxController");

const router = express.Router();

router.get("/", getInboxs);

module.exports = router;
