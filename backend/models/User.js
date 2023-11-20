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
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
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