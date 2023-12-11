const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String
    },
    defaultfolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder"
    },
    lastToken: {
        type: String
    }
},{
    timestamps: true
});


module.exports = mongoose.model("User",userSchema);