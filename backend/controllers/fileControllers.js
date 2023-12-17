const Code = require("../models/Code");
const File = require("../models/File");
const Folder = require("../models/Folder");
const ExpressError = require("../utils/ExpressError");

module.exports.createFile = async (req, res) => {
    const { file, folderId } = req.body;

    const folder = await Folder.findById(folderId);

    if (!folder) {
        throw new ExpressError("Select the folder where file need to be created", 400);
    }

    const createdCode = new Code();
    createdCode.language = file.language;
    createdCode.code = "";
    createdCode.title = file.filename;
    await createdCode.save();

    const createdFile = new File();
    createdFile.filename = file.filename;
    createdFile.language = file.language;
    createdFile.content = createdCode;
    createdFile.owner = req.user;
    await createdFile.save();

    folder.files.push(createdFile);
    await folder.save();

    const f = await Folder.findById(folderId)
        .populate("files")
        .populate("folders");

    return res.status(200).json({ success: true, folder: f });
}

module.exports.saveChanges = async (req, res) => {
    const { code, fileId } = req.body;

    const file = await File.findById(fileId)
        .populate("content")
        .populate("owner");

    if (!file.owner._id.equals(req.user._id)) {
        throw new ExpressError("You need to signin to change this file", 400);
    }

    const c = await Code.findById(file.content._id);
    c.code = code;
    await c.save();

    return res.status(200).json({ success: true });
}

module.exports.getFileContent = async (req, res) => {
    const { fileId } = req.body;

    const searchedFile = await File.findById(fileId)
        .populate("content")
        .populate("owner");

    if (!searchedFile.owner._id.equals(req.user._id)) {
        throw new ExpressError("Signin to view the content of the file", 400);
    }

    return res.status(200).json({ success: true, file: searchedFile });
}

module.exports.deleteFile = async (req, res) => {
    const { fileId, folderId } = req.body;

    const folder = await Folder.findById(folderId);

    const file = await File.findById(fileId)
        .populate("owner");

    if (!folder) {
        throw new ExpressError("Select the folder from where file to be deleted", 400);
    }

    if (!file.owner._id.equals(req.user._id)) {
        throw new ExpressError("Signin to delete file from the folder", 400);
    }

    await Folder.findByIdAndUpdate(folderId, {
        $pull: { files: fileId }
    });

    await File.findByIdAndDelete(fileId);

    const f = await Folder.findById(folderId)
        .populate("files")
        .populate("folders");

    return res.status(200).json({ success: true, folder: f });
}