const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    attachment: [{ type: String }],
    sender: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
      email: String,
    },
    receiver: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
      email: String,
    },
    conversation_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
