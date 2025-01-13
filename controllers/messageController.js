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
        email: userInfo.email,
      },
      receiver: {
        _id: receiver._id,
        name: receiver.name,
        avatar: receiver.avatar,
        email: receiver.email,
      },
      conversation_id: req.body.conversation_id,
    };
    const message = new Message(postData);
    const savedMessage = await message.save();

    //update last_message of conversation table
    await Conversation.findOneAndUpdate(
      { _id: req.body.conversation_id },
      { last_message: req.body.message }
    );

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

const editMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      { _id: req.params.id?.toString() },
      { message: req.body.message },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Message updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Can not update message",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({
      _id: req.params.id?.toString(),
    });
    return res.status(200).json({
      status: 200,
      message: "Message deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Can not delete message",
    });
  }
};

const addMessageWithConversation = async (req, res) => {
  try {
    const { email } = req;

    if (email == req.body.email) {
      return res.status(500).json({
        status: 500,
        message: "Can not send message to yourself",
      });
    }

    const userInfo = await User.findOne({ email });
    const participantInfo = await User.findOne({ email: req.body.email });

    if (!participantInfo) {
      return res.status(500).json({
        status: 500,
        message: "Can not find participant",
      });
    }

    const conversation = new Conversation({
      creator: {
        _id: userInfo._id,
        name: userInfo.name,
        email: email,
        avatar: userInfo.avatar,
      },
      participant: {
        _id: participantInfo._id,
        name: participantInfo.name,
        email: req.body.email,
        avatar: participantInfo.avatar || null,
      },
      last_message: req.body.message || "",
    });

    const savedConversation = await conversation.save();

    const postData = {
      message: req.body.message,
      attachment: req.body.attachment || [],
      sender: {
        _id: userInfo._id,
        name: userInfo.name,
        avatar: userInfo.avatar,
        email: userInfo.email,
      },
      receiver: {
        _id: participantInfo._id,
        name: participantInfo.name,
        avatar: participantInfo.avatar || null,
        email: participantInfo.email,
      },
      conversation_id: savedConversation._id,
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

module.exports = {
  addMessage,
  getMessages,
  editMessage,
  deleteMessage,
  addMessageWithConversation,
};
