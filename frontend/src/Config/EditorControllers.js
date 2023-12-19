export async function getFolder(id, getFolderDetailsFunction, setShowSnackFunction, setFolderLoading) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/folders/getdetails",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folderId: id
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        getFolderDetailsFunction(json.folder);
    } else {
        setShowSnackFunction(json.err, "error");
    }
    setFolderLoading(false);
}

export async function createNewFolder(folder, rootID, getFolderDetailsFunction, setShowSnackFunction) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const f = folder;
    f.rootID = rootID;
    const response = await fetch(
        "http://localhost:5000/codeverse/folders/createfolder",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folder: folder
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        getFolderDetailsFunction(json.folder);
        setShowSnackFunction("New Folder created", "success");
    } else {
        setShowSnackFunction(json.err, "error");
    }
}

export async function goToParentFolder(folderId, getFolderDetailsFunction, setShowSnackFunction, setFolderLoading) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/folders/getparent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folderId: folderId
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        getFolderDetailsFunction(json.parent);
    } else {
        setShowSnackFunction(json.err, "error");
    }
    setFolderLoading(false);
}

export async function deleteFolder(rootId, folderId, getFolderDetailsFunction, setShowSnackFunction, setFolderLoading) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/folders/deletefolder",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folderId: folderId,
                rootId: rootId
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        getFolderDetailsFunction(json.folder);
    } else {
        setShowSnackFunction(json.err, "error");
    }
    setFolderLoading(false);
}

export async function createNewFileFunction(file, folderId, setShowSnackFunction, getFolderDetailsFunction) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/files/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folderId: folderId,
                file: file
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        getFolderDetailsFunction(json.folder);
        setShowSnackFunction("New File created", "success");
    } else {
        setShowSnackFunction(json.err, "error");
    }
}

export async function deleteExistingFile(fileId, folderId, setShowSnackFunction, getFolderDetailsFunction, setFolderLoadingFunction) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/files/delete",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folderId: folderId,
                fileId: fileId
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        getFolderDetailsFunction(json.folder);
        setShowSnackFunction("File deleted successfully", "success");
    } else {
        setShowSnackFunction(json.err, "error");
    }
    setFolderLoadingFunction(false);
}

export async function getFileContents(fileId, setOpenedCodeFunction, setShowSnackFunction) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/files",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                fileId: fileId
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setOpenedCodeFunction(json.file.content);
        return { success: true, code: json.file.content };
    } else {
        setShowSnackFunction(json.err, "error");
    }
    return { success: false };
}

export async function saveFileChanges(fileId, code, setShowSnackFunction) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/files/save",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                fileId: fileId,
                code: code
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setShowSnackFunction("File saved successfully", "success");
    } else {
        setShowSnackFunction(json.err, "error");
    }
}

export async function saveTempFile(folderId, code, setShowSnackFunction, navigate) {
    const token = localStorage.getItem("codeverseUserSignInToken");
    const response = await fetch(
        "http://localhost:5000/codeverse/files/createtempfile",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                folderId: folderId,
                code: code
            }),
        }
    );
    const json = await response.json();
    if (json.success) {
        setShowSnackFunction("File saved inside Temp folder on your desktop", "success");
        navigate('/editor');
    } else {
        setShowSnackFunction(json.err, "error");
    }
}