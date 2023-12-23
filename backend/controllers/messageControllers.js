const Message = require("../models/Message");
const Code = require("../models/Code");
const Chat = require("../models/Chat");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/User");

module.exports.sendMessage = async (req, res) => {
    const { message } = req.body;
    const chat = await Chat.findById(message.chat);
    if (!chat) {
        throw new ExpressError("Chat not found", 400);
    }
    const newMessage = new Message();
    newMessage.iscode = message.iscode;
    if (message.iscode) {
        const code = new Code(message.code);
        await code.save();
        newMessage.code = code;
    } else {
        newMessage.message = message.message;
    }
    newMessage.chat = chat;
    newMessage.sender = req.user;
    newMessage.readBy.push(req.user);
    await newMessage.save();
    var m = await Message.findById(newMessage._id)
        .populate("sender")
        .populate("code")
        .populate("readBy")
        .populate("chat");
    m = await User.populate(m, {
        path: 'chat.users'
    })
    chat.latestMessage = newMessage;
    await chat.save();
    if (!m) {
        throw new ExpressError("An Error Occured while sending the message", 400);
    }
    return res.status(200).json({ success: true, message: m });
}

module.exports.allMessages = async (req, res) => {
    const { chatId } = req.body;
    if (!chatId) {
        throw new ExpressError("You need to provide the chatId of the chat to view the messages", 400);
    }
    let messages = await Message.find({ chat: chatId })
        .populate("code")
        .populate("sender")
        .populate("readBy");
    const m = messages;
    messages = await Promise.all(messages.map(async (mes) => {
        if (!mes.readBy.some(user => user._id.toString() === req.user._id.toString())) {
            mes.readBy.push(req.user._id);
        }
        await mes.save();
        return mes;
    }))

    return res.status(200).json({ success: true, messages: m });
}