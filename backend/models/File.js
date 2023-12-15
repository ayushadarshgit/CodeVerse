const mongoose = require("mongoose");
const Code = require("./Code");
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
}, {
    timestamps: true
})

fileSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Code.deleteMany({
            _id: doc.content
        });
    }
});

module.exports = mongoose.model("File", fileSchema);