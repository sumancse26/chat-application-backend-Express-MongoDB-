const User = require("../models/User");
const Conversation = require("../models/Conversation");

const addConversationHandler = async (
  email,
  conversationId,
  message,
  participantEmail
) => {
  const userInfo = await User.findOne({ email });
  let conversationInfo = null;
  if (req.body.conversation_id) {
    conversationInfo = await Conversation.findOne({
      _id: req.body.conversation_id,
    });
  } else {
    conversationInfo = await Conversation.findOne({
      $or: [
        { "creator.email": req.body.email },
        { "participant.email": req.body.email },
      ],
    });
  }

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

  // update last_message of conversation table
  await Conversation.findOneAndUpdate(
    { _id: req.body.conversation_id },
    { last_message: req.body.message }
  );

  return savedConversation;
};

module.exports = addConversationHandler;
