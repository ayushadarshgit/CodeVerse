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

module.exports.saveTempFile = async (req, res) => {
    const { code, folderId } = req.body;
    if (!code) {
        throw new ExpressError("Please provide the code to save", 400);
    }
    const defaultFolder = await Folder.findById(folderId)
        .populate("folders");
    if (!defaultFolder) {
        throw new ExpressError("Default folder not found", 400);
    }
    let f = defaultFolder.folders;
    f = f.filter((fol) => {
        return fol.foldername === "Temp"
    })
    let destFolder;
    if (f.length === 0) {
        destFolder = new Folder();
        destFolder.foldername = "Temp";
        destFolder.owner = req.user;
        await destFolder.save();
        defaultFolder.folders.push(destFolder);
        await defaultFolder.save();
    } else {
        destFolder = f[0];
    }
    let size = destFolder.files.length

    const createdCode = new Code();
    createdCode.language = code.language;
    createdCode.code = code.code;
    createdCode.title = `untitled${size === 0 ? "" : `${size}`}`;
    await createdCode.save();

    const createdFile = new File();
    createdFile.filename = code.title ? code.title : `untitled${size === 0 ? "" : `${size}`}`;
    createdFile.language = code.language;
    createdFile.owner = req.user;
    createdFile.content = createdCode;

    destFolder.files.push(createdFile);
    await destFolder.save();

    await createdFile.save();
    return res.status(200).json({ success: true });
}