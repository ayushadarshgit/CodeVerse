const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatname: {
        type: String,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    isgroupchat: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Schema.Types.ObjectId
    },
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Chat",chatSchema);