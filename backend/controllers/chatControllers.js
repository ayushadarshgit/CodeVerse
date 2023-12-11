const ExpressError = require("../utils/ExpressError");
const Chat = require("../models/Chat");
const User = require("../models/User");
const Code = require("../models/Code");

module.exports.getChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new ExpressError("Need To provide the Id Of second User", 400);
    }
    if (Array.isArray(userId)) {
        throw new ExpressError("The userId provided should not be array", 400);
    }
    var isChat = await Chat.findOne({
        isgroupchat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");
    if (isChat) {
        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name email"
        });
        if (isChat.latestMessage.iscode) {
            isChat = await Code.populate(isChat, {
                path: "latestMessage.code",
                select: "code title language"
            })
        }
        return res.status(200).json({ success: true, chat: isChat });
    }
    try {
        const chatData = new Chat();
        chatData.chatname = "sender";
        chatData.isgroupchat = false;
        chatData.users = [req.user._id, userId];
        await chatData.save();
        return res.status(200).json({ status: true, chat: chatData });
    } catch (error) {
        throw new ExpressError(error.message, 400);
    }
}

module.exports.fetchChats = async (req, res) => {
    try {
        let chats = Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("admin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name email"
        });
        chats = await Promise.all(chats.map(async (chat) => {
            if (chat.latestMessage.iscode) {
                const popChat = await Code.populate(chat, {
                    path: "latestMessage.code",
                    select: "code title language"
                });
                return popChat;
            }
            return chat;
        }));
        res.status(200).json({ success: true, chats: chats });
    } catch (error) {
        throw new ExpressError(error.message, 400);
    }
}

module.exports.createGroupChat = async (req, res) => {
    const { chatname, users } = req.body.chat;
    users.push(req.user);
    try {
        const newChat = new Chat();
        newChat.chatname = chatname;
        newChat.users = users;
        newChat.isgroupchat = true;
        newChat.admin = req.user._id;
        await newChat.save();
        const fullGroupChat = await Chat.findById(newChat._id)
            .populate("users", "-password")
            .populate("admin", "-password");
        return res.status(200).json({ success: true, chat: fullGroupChat })
    } catch (error) {
        throw new ExpressError(error.message, 400);
    }
}

module.exports.renameGroup = async (req, res) => {
    try {
        const { chatId, newName } = req.body;
        if (!newName) {
            throw new ExpressError("You Need To give the new Group Name to continue", 400);
        }
        const chat = await Chat.findById(chatId)
            .populate("admin", "-password");
        if (chat.admin !== req.user) {
            throw new ExpressError("You need to be admin of the group to rename it", 400);
        }
        chat.chatname = newName;
        await chat.save();
        const renamedChat = await Chat.findById(chat._id)
            .populate("users", "-password")
            .populate("admin", "-password");
        return res.status(200).json({ success: true, chat: renamedChat });
    } catch (error) {
        throw new ExpressError(error.message, 400);
    }
}

module.exports.addToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        if (!userId) {
            throw new ExpressError("Select the user to be added in the group", 400);
        }
        const chat = Chat.findById(chatId)
            .populate("admin")
            .populate("users");
        if (chat.admin !== req.user) {
            throw new ExpressError("Only admin of the group can add any member", 400);
        }
        if (chat.users.indexOf(userId) !== -1) {
            throw new ExpressError("User Already added to the group", 400);
        }
        chat.users.push(userId);
        await chat.save();
        const updatedChat = await Chat.findById(chat._id)
            .populate("admin", "-password")
            .populate("users", "-password");
        return res.status(200).json({ success: true, chat: updatedChat });
    } catch (error) {
        throw new ExpressError(error.message, 400);
    }
}

module.exports.removeFromGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const chat = await Chat.findById(chatId)
            .populate("admin");
        if (!chat) {
            throw new ExpressError("Chat not found", 400);
        }
        if (chat.admin !== req.user) {
            throw new ExpressError("You need to be admin to remove anyone from group", 400);
        }
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId }
        }, {
            new: true
        })
            .populate("users", "-password")
            .populate("admin", "-password");
        return res.status(400).json({ success: true, chat: removed });
    } catch (error) {
        throw new ExpressError(error.message, 400);
    }
}

module.exports.updateIcon = async (req, res) => {
    const { chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (chat.isCloudinary) {
        await cloudinary.uploader.destroy(chat.icon.filename);
    }
    await chat.save();
    const updatedChat = await Chat.findById(chat._id)
        .populate("admin", "-password")
        .populate("users", "-password");
    return res.status(200).json({ success: true, chat: updatedChat });
}