const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const File = require("./File");

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
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

folderSchema.post('findByIdAndDelete', async function(doc){
    if(doc){
        await Promise.all(doc.folders.map(async (folderId) => {
            await Folder.findByIdAndDelete(folderId);
        }));
        await File.deleteMany({
            _id: {
                $in: doc.files
            }
        })
    }
})

module.exports = mongoose.model("Folder",folderSchema);