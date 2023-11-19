const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    foldername: {
        type: String,
        required: true
    },
    folders: [{
        type: Schema.Types.ObjectId,
        ref: "Folder"
    }],
    files: [{
        type: Schema.Types.ObjectId,
        ref: "File"
    }],
    isdefaultfolder: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Folder",folderSchema);