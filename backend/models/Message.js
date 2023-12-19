const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
    },
    iscode: {
        type: Boolean,
        required: true
    },
    code: {
        type: Schema.Types.ObjectId,
        ref: "Code"
    },
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
},{
    timestamps: true
})

module.exports = mongoose.model("Message",messageSchema);