const Folder = require("../models/Folder")
const ExpressError = require("../utils/ExpressError");

module.exports.getFolderDetails = async (req, res) => {
    const { folderId } = req.body;
    if (!folderId) {
        throw new ExpressError("You need to give the Id of the folder to get the details for", 400);
    }
    const searchedFolder = await Folder.findById(folderId)
        .populate("folders")
        .populate("files");
    if(searchedFolder.owner !== req.user){
        throw new ExpressError("You are not the owner of this folder",400);
    }
    if (!searchedFolder) {
        throw new ExpressError("No folder found with given folderId", 400);
    }
    return res.status(200).json({ success: true, folder: searchedFolder });
}

module.exports.createFolder = async (req, res) => {
    const { rootID } = req.body;
    if (!rootID) {
        throw new ExpressError("You need to provide the id of folder where new folder to be created", 400);
    }
    const rootFolder = await Folder.findById(rootID)
        .populate("folders");
    if(!rootFolder){
        throw new ExpressError("Unable to find the root folder",400);
    }
    for (let folder of rootFolder.folders) {
        if (folder.foldername === req.body.folder.foldername) {
            throw new ExpressError("Folder name already exists in the root folder", 400);
        }
    }
    const createdFolder = new Folder(req.body.folder);
    createdFolder.isdefaultfolder = false;
    createdFolder.owner = req.user;
    await createdFolder.save();
    rootFolder.folders.push(createdFolder);
    await rootFolder.save();
    const updatedRoot = await Folder.findById(rootId)
        .populate("folders")
        .populate("files");
    return res.status(200).json({ success: true, folder: updatedRoot });
}

module.exports.deleteFolder = async (req, res) => {
    const { rootId, folderId } = req.body;
    const f = await Folder.findById(folderId);
    if(!f){
        throw new ExpressError("Unable to get the folder to be deleted",400);
    }
    if(!rootId){
        throw new ExpressError("Select the folder from the existing folder to be deleted",400);
    }
    if (f.isdefaultfolder) {
        throw new ExpressError("You cannot delete the root folder", 400);
    }
    if(f.owner !== req.user){
        throw new ExpressError("You are not the owner of the folder you want to delete",400);
    }
    await Folder.findByIdAndUpdate(rootId, {
        $pull: { folders: folderId }
    }, {
        new: true
    })
    await Folder.findByIdAndDelete(folderId);
    const rootFolder = await Folder.findById(rootId)
        .populate("folders")
        .populate("files");
    return res.status(200).json({ success: true, folder: rootFolder });
}