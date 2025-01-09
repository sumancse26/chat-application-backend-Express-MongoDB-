const Conversation = require("../models/Conversation.js");
const User = require("../models/User.js");

const getInboxs = async (req, res) => {
  try {
    const { email } = req;
    const userInfo = await User.findOne({ email });
    const conversations = await Conversation.find({
      $or: [
        { "creator._id": userInfo._id },
        { "participant._id": userInfo._id },
      ],
    });

    return res.status(200).json({
      status: 200,
      conversations,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

const addConversation = async (req, res) => {
  try {
    const { email } = req;
    const userInfo = await User.findOne({ email });
    const participantInfo = await User.findOne({
      email: req.body.participant_email,
    });

    const conversationExists = await Conversation.findOne({
      $or: [
        {
          $and: [
            {
              "creator._id": userInfo._id,
            },
            {
              "participant._id": participantInfo._id,
            },
          ],
        },
        {
          $and: [
            {
              "creator._id": participantInfo._id,
            },
            {
              "participant._id": userInfo._id,
            },
          ],
        },
      ],
    });

    if (conversationExists) {
      return res.status(400).json({
        status: 400,
        message: "Conversation already exists",
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
        email: req.body.participant_email,
        avatar: participantInfo.avatar,
      },
      last_message: req.body.last_message || "",
    });

    const savedConversation = await conversation.save();
    return res.status(200).json({
      status: 200,
      _id: savedConversation._id,
      message: "Conversation created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const deletedConversation = await findOneAndDelete({
      _id: req.params.id?.toString(),
    });

    return res.status(200).json({
      status: 200,
      message: "Conversation deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Can not delete conversation",
    });
  }
};

module.exports = { getInboxs, addConversation, deleteConversation };
