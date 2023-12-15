const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    code: {
        type: String,
    },
    language: {
        type: String,
        default: "plaintext"
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Code", codeSchema);