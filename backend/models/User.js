const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    isEmailVerified: {
        type: Boolean,
        required: true
    },
    isPhoneVerified: {
        type: Boolean,
        required: true
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
    defaultfolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
        unique: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User",userSchema);