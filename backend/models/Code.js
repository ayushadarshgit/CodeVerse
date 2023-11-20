const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "plaintext"
    }
},{
    timestamps: true
})


module.exports = mongoose.model("Code",codeSchema);