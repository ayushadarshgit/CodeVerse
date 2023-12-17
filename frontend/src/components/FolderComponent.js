import { IconButton, SpeedDial, Stack, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderIcon from '@mui/icons-material/Folder';
import { setFolder, setFolderLoading, setOpenedCode, setOpenedFiles, setOpenedView, showSnack } from '../features/login/loginSlice';
import { createNewFileFunction, createNewFolder, deleteExistingFile, deleteFolder, getFileContents, getFolder, goToParentFolder } from '../Config/EditorControllers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


export default function FolderComponent() {
    const newFolderNameRef = useRef(null);
    const newFileNameRef = useRef(null);
    const folder = useSelector(state => state.folder);
    const openedFiles = useSelector(state => state.openedFiles);
    const openedFilesSavedCode = useSelector(state => state.openedFilesSavedCode);
    const openedFilesCurrentCode = useSelector(state => state.openedFilesCurrentCode);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [createFolder, setCreateFolder] = useState(false);
    const [createFile, setCreateFile] = useState(false);
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState({
        foldername: "",
        rootID: ""
    });

    const [highlight, setHighlight] = useState(-1);
    const [highlightFile, setHighlightFile] = useState(-1);


    const handleChange = (evt) => {
        setNewFolderName({
            ...newFolderName,
            foldername: evt.target.value
        })
    }

    const handleFileChange = (evt) => {
        setFile(evt.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRandomClick = () => {
        if (createFolder) {
            setCreateFolder(false);
            setNewFolderName({
                foldername: "",
                rootID: ""
            });
        }
        if (createFile) {
            setCreateFile(false);
            setFile("")
        }
    }

    const createNewFolderChange = () => {
        setHighlight(-1);
        setHighlightFile(-1);
        setCreateFolder(true);
    }

    const createNewFileChange = () => {
        setHighlight(-1);
        setHighlightFile(-1);
        setCreateFile(true);
    }

    const getFolderDetailsFunction = (folder) => {
        dispatch(setFolder({ folder: folder }))
    }

    const setShowSnackFunction = (message, severity) => {
        dispatch(showSnack({
            message: message,
            severity: severity
        }))
    }

    const setFolderLoadingFunction = (loading) => {
        dispatch(setFolderLoading({ loading: loading }));
    }

    const handleDoubleClick = (id) => {
        setFolderLoadingFunction(true);
        getFolder(id, getFolderDetailsFunction, setShowSnackFunction, setFolderLoadingFunction);
        setHighlight(-1);
    }

    const goBack = (id) => {
        setFolderLoadingFunction(true);
        goToParentFolder(id, getFolderDetailsFunction, setShowSnackFunction, setFolderLoadingFunction);
        setHighlight(-1);
    }

    const deleteFolderFunction = (rootId, folderId) => {
        setFolderLoadingFunction(true);
        deleteFolder(rootId, folderId, getFolderDetailsFunction, setShowSnackFunction, setFolderLoadingFunction);
        setHighlight(-1);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (createFolder) {
                setNewFolderName({
                    ...newFolderName,
                    rootID: folder._id
                })
                if (newFolderName.foldername === "") {
                    setShowSnackFunction("Folder Name cannot be Empty", "error");
                } else {
                    createNewFolder(newFolderName, folder._id, getFolderDetailsFunction, setShowSnackFunction);
                }
                handleRandomClick();
            }
            if (createFile) {
                const parts = file.split('.');
                if (parts.length === 1) {
                    setShowSnackFunction("You Should provide appropriate extension for the file", "error");
                } else if (parts.length > 2) {
                    setShowSnackFunction("File name can not contain any '.' in it", "error")
                } else {
                    if (parts[1] !== "txt" && parts[1] !== "js" && parts[1] !== "java" && parts[1] !== "py" && parts[1] !== "cpp") {
                        setShowSnackFunction("Please provide appropriate file extension. Acceptable extensions are '.txt', '.js', '.py', '.java', '.cpp' ", "error")
                    } else {
                        const createdFile = {
                            filename: parts[0]
                        }
                        if (parts[1] === "txt") {
                            createdFile.language = "plaintext";
                        } else if (parts[1] === "js") {
                            createdFile.language = "javascript";
                        } else if (parts[1] === "py") {
                            createdFile.language = "python";
                        } else if (parts[1] === "java") {
                            createdFile.language = "java";
                        } else {
                            createdFile.language = "cpp";
                        }
                        createNewFileFunction(createdFile, folder._id, setShowSnackFunction, getFolderDetailsFunction);
                        setFile("");
                        handleRandomClick();
                    }
                }
            }
        }
    }

    const deleteFileFunction = (id) => {
        setFolderLoadingFunction(true);
        deleteExistingFile(id, folder._id, setShowSnackFunction, getFolderDetailsFunction, setFolderLoadingFunction);
        setHighlightFile(-1);
    }

    const handleFolderHighLight = (ind) => {
        setHighlight(ind);
        if (highlightFile !== -1) {
            setHighlightFile(-1);
        }
    }

    const handleFileHighLight = (ind) => {
        setHighlightFile(ind);
        if (highlight !== -1) {
            setHighlight(-1);
        }
    }

    const setOpenedCodeFunction = (code) => {
        dispatch(setOpenedCode({ code: code }));
    }


    const setHandleOpenedFilesFunction = async (file) => {
        const f = [...openedFiles]
        const sc = [...openedFilesSavedCode]
        const cc = [...openedFilesCurrentCode]
        if (f.indexOf(file) === -1) {
            f.push(file);
            const res = await getFileContents(file._id, setOpenedCodeFunction, setShowSnackFunction);
            if (res.success) {
                sc.push({ id: file._id, code: res.code.code });
                cc.push({ id: file._id, code: res.code.code });
                console.log(sc,cc);
                console.log(sc[0].code === cc[0].code);
                dispatch(setOpenedFiles({ files: f, savedCode: sc, currentCode: cc }));
                dispatch(setOpenedView({ view: file }));
            }
        } else {
            setShowSnackFunction("File Already Opened", "warning")
        }
        setHighlightFile(-1);
        navigate("/files")
    }

    useEffect(() => {
        if (newFolderNameRef.current) {
            newFolderNameRef.current.focus();
        }
    }, [createFolder]);

    useEffect(() => {
        if (newFileNameRef.current) {
            newFileNameRef.current.focus();
        }
    }, [createFile])

    const actions = [
        { icon: <CreateNewFolderIcon sx={{ color: '#000' }} onClick={createNewFolderChange} />, name: 'New Folder' },
        { icon: <NoteAddIcon sx={{ color: '#000' }} onClick={createNewFileChange} />, name: 'New File' },
    ];

    const images = {
        javascript: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
        cpp: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
        java: "https://cdn-icons-png.flaticon.com/256/226/226777.png",
        python: "https://cdn-icons-png.flaticon.com/512/919/919852.png",
        plaintext: "https://cdn-icons-png.flaticon.com/512/2306/2306185.png"
    };

    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
            }}
        >
            <Stack
                sx={{
                    width: "60%",
                    height: "50px",
                    backgroundColor: "#222",
                    borderRadius: "10px",
                    color: "#ccc",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "xx-large",
                    flexDirection: "row"
                }}
            >
                {
                    folder.foldername !== "root"
                    &&
                    <IconButton
                        sx={{
                            marginLeft: "10px",
                            color: '#fff',
                        }}
                        onClick={() => goBack(folder._id)}
                    >
                        <ArrowBackIcon sx={{ fontSize: "xx-large" }} />
                    </IconButton>
                }
                <Stack
                    sx={{
                        width: "95%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {folder.foldername === "root" ? "Desktop" : folder.foldername}
                </Stack>
            </Stack>
            <Stack
                sx={{
                    width: "95%",
                    height: "85%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    overflowY: "scroll",
                    flexDirection: "row"
                }}
                onClick={handleRandomClick}
            >
                {
                    !createFolder
                    &&
                    !createFile
                    &&
                    folder.folders.length === 0
                    &&
                    folder.files.length === 0
                    &&
                    <Stack
                        sx={{
                            width: "100%",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            textAlign: "center",
                            color: "#777",
                            fontSize: "larger",
                            marginTop: "20px"
                        }}
                    >
                        This Folder Is Empty ...
                    </Stack>
                }
                {folder.folders.map((f, ind) => {
                    return <Stack
                        key={f._id}
                        sx={{
                            width: "150px",
                            height: "125px",
                            backgroundColor: highlight === ind ? "rgba(51,51,51,0.6)" : "",
                            marginTop: '25px',
                            marginLeft: "25px",
                            borderRadius: "5px",
                            border: highlight === ind ? "2px solid #333" : "",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            cursor: "pointer"
                        }}
                        onClick={() => { handleFolderHighLight(ind) }}
                        onDoubleClick={() => handleDoubleClick(f._id)}
                    >
                        <FolderIcon sx={{ fontSize: "80px", color: "#aaa" }} />
                        <Stack
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#ddd",
                                fontSize: "larger",
                                flexDirection: "row"
                            }}
                        >
                            <Stack
                                sx={{
                                    width: "95%",
                                    textAlign: "center",
                                }}
                            >

                                {f.foldername}
                            </Stack>
                            {
                                highlight === ind
                                &&
                                <IconButton
                                    sx={{
                                        color: '#fff',
                                    }}
                                    onClick={() => deleteFolderFunction(folder._id, f._id)}
                                >
                                    <DeleteIcon sx={{ fontSize: "large" }} />
                                </IconButton>
                            }
                        </Stack>
                    </Stack>
                })}
                {folder.files.map((f, ind) => {
                    return <Stack
                        key={f._id}
                        sx={{
                            width: "150px",
                            height: "125px",
                            backgroundColor: highlightFile === ind ? "rgba(51,51,51,0.6)" : "",
                            marginTop: '25px',
                            marginLeft: "25px",
                            borderRadius: "5px",
                            border: highlightFile === ind ? "2px solid #333" : "",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flexDirection: "column",
                            cursor: "pointer"
                        }}
                        onClick={() => { handleFileHighLight(ind) }}
                        onDoubleClick={() => setHandleOpenedFilesFunction(f)}
                    >
                        <img src={
                            (f.language === "plaintext" && images.plaintext) ||
                            (f.language === "javascript" && images.javascript) ||
                            (f.language === "python" && images.python) ||
                            (f.language === "java" && images.java) ||
                            (f.language === "cpp" && images.cpp)
                        } style={{
                            height: "60px",
                            width: "60px"
                        }} alt="" />
                        <Stack
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#ddd",
                                fontSize: "larger",
                                flexDirection: "row"
                            }}
                        >
                            <Stack
                                sx={{
                                    width: "95%",
                                    textAlign: "center",
                                }}
                            >

                                {f.filename}
                            </Stack>
                            {
                                highlightFile === ind
                                &&
                                <IconButton
                                    sx={{
                                        color: '#fff',
                                    }}
                                    onClick={() => deleteFileFunction(f._id)}
                                >
                                    <DeleteIcon sx={{ fontSize: "large" }} />
                                </IconButton>
                            }
                        </Stack>
                    </Stack>
                })}
                {
                    createFolder
                    &&
                    <Stack
                        sx={{
                            width: "150px",
                            height: "125px",
                            backgroundColor: "rgba(51,51,51,0.6)",
                            marginTop: '25px',
                            marginLeft: "25px",
                            borderRadius: "5px",
                            border: "2px solid #333",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            cursor: "pointer"
                        }}
                    >
                        <CreateNewFolderIcon sx={{ fontSize: "80px", color: "#aaa" }} />
                        <Stack
                            sx={{
                                width: "90%",
                                height: "30px",
                                backgroundColor: "#333",
                            }}
                        >
                            <TextField
                                variant='standard'
                                color='secondary'
                                value={newFolderName.foldername}
                                onChange={handleChange}
                                inputRef={newFolderNameRef}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                    },
                                }}
                            />
                        </Stack>
                    </Stack>
                }
                {
                    createFile
                    &&
                    <Stack
                        sx={{
                            width: "150px",
                            height: "125px",
                            backgroundColor: "rgba(51,51,51,0.6)",
                            marginTop: '25px',
                            marginLeft: "25px",
                            borderRadius: "5px",
                            border: "2px solid #333",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            cursor: "pointer"
                        }}
                    >
                        <NoteAddIcon sx={{ fontSize: "80px", color: "#aaa" }} />
                        <Stack
                            sx={{
                                width: "90%",
                                height: "30px",
                                backgroundColor: "#333",
                            }}
                        >
                            <TextField
                                variant='standard'
                                color='secondary'
                                value={file}
                                onChange={handleFileChange}
                                inputRef={newFileNameRef}
                                onKeyDown={handleKeyDown}
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        paddingLeft: "5px",
                                        paddingRight: "5px",
                                    },
                                }}
                            />
                        </Stack>
                    </Stack>
                }
                <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 35, right: 50 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction='left'
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                            color='#000'
                        />
                    ))}
                </SpeedDial>
            </Stack>
        </Stack>
    )
}
