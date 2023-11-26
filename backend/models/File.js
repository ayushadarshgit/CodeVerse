const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    content: {
        type: Schema.Types.ObjectId,
        ref: "Code"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("File",fileSchema);