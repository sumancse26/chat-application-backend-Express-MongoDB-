const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const addMessage = async (req, res) => {
  try {
    const { email } = req;

    const conversationInfo = await Conversation.findOne({
      _id: req.body.conversation_id,
    });

    const userInfo = await User.findOne({ email });

    let receiver = null;
    if (userInfo._id?.toString() === conversationInfo.creator._id?.toString()) {
      receiver = conversationInfo.participant;
    } else {
      receiver = conversationInfo.creator;
    }
    const postData = {
      message: req.body.message,
      attachment: req.body.attachment || [],
      sender: {
        _id: userInfo._id,
        name: userInfo.name,
        avatar: userInfo.avatar,
      },
      receiver: {
        _id: receiver._id,
        name: receiver.name,
        avatar: receiver.avatar,
      },
      conversation_id: req.body.conversation_id,
    };
    const message = new Message(postData);
    const savedMessage = await message.save();
    return res.status(200).json({
      status: 200,
      _id: savedMessage._id,
      message: "Message sent successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Can not send message",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.id?.toString(),
    }).select({ __v: 0 });
    return res.status(200).json({
      status: 200,
      messages,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Can not get messageses",
    });
  }
};

module.exports = { addMessage, getMessages };
