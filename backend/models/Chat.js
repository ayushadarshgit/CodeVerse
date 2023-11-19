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
    icon: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Chat",chatSchema);