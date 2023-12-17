import { Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import SnackBar from '../components/SnackBar'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import { setOpenedFiles, setOpenedView, showSnack } from '../features/login/loginSlice'
import { useNavigate } from 'react-router-dom'
import NotOpenedFileView from '../components/NotOpenedFileView'
import ViewCodeContent from '../components/ViewCodeContent'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SaveIcon from '@mui/icons-material/Save';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { saveFileChanges } from '../Config/EditorControllers'

export default function FileViewer() {
    const editorRef = useRef(null);
    const openedFiles = useSelector(state => state.openedFiles);
    const openedFilesSavedCode = useSelector(state => state.openedFilesSavedCode);
    const openedFilesCurrentCode = useSelector(state => state.openedFilesCurrentCode);
    const openedView = useSelector(state => state.openedView);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [codeLoading, setCodeLoading] = useState(true);

    const setOpenedViewFunction = (f) => {
        if (openedView !== f) {
            dispatch(setOpenedView({ view: f }));
        }

    }

    const isChanged = (id) => {
        const sc = openedFilesSavedCode.filter(f => f.id === id);
        const cc = openedFilesCurrentCode.filter(f => f.id === id);
        if (sc[0].code === cc[0].code) {
            return false;
        }
        return true;
    }

    const setShowSnackFunction = (message, severity) => {
        dispatch(showSnack({
            message: message,
            severity: severity
        }))
    }

    const removeFileFromOpenedFiles = (fileToRemove) => {
        if (isChanged(fileToRemove._id)) {
            const sc = openedFilesSavedCode.filter(f => f.id !== fileToRemove._id);
            const cc = openedFilesCurrentCode.filter(f => f.id === fileToRemove._id);
            sc.push(cc[0]);
            saveFileChanges(fileToRemove._id, cc[0].code, setShowSnackFunction);
            dispatch(setOpenedFiles({ files: openedFiles, savedCode: sc, currentCode: openedFilesCurrentCode }));
        } else {
            const f = openedFiles.filter((f) => f !== fileToRemove);
            const sc = openedFilesSavedCode.filter(f => f.id !== fileToRemove._id);
            const cc = openedFilesCurrentCode.filter(f => f.id !== fileToRemove._id);
            dispatch(setOpenedFiles({ files: f, savedCode: sc, currentCode: cc }));
        }
    }

    const restoreCode = (file) => {
        const sc = openedFilesSavedCode.filter(f => f.id === file._id);
        const cc = openedFilesCurrentCode.filter(f => f.id !== file._id);
        cc.push(sc[0]);
        dispatch(setOpenedFiles({ files: openedFiles, savedCode: openedFilesSavedCode, currentCode: cc }));
        dispatch(setOpenedView({ view: null }));
    }

    const images = {
        javascript: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
        cpp: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
        java: "https://cdn-icons-png.flaticon.com/256/226/226777.png",
        python: "https://cdn-icons-png.flaticon.com/512/919/919852.png",
        plaintext: "https://cdn-icons-png.flaticon.com/512/2306/2306185.png"
    }
    useEffect(() => {
        if (openedFiles.length === 0) {
            navigate('/editor')
        }
    }, [openedFiles, navigate])
    return (
        <Stack
            sx={{
                width: "95.5%",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#000"
            }}
        >
            <CompilerTopBar text="( Editor )" />
            <Stack
                sx={{
                    width: "100%",
                    height: "7.5%",
                    backgroundColor: "#111",
                    borderRadius: "3px",
                    overflowX: "scroll",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // borderTop: "1px solid #555",
                }}
            >
                {
                    openedFiles.map((f, ind) => {
                        return <Stack
                            key={f._id}
                            sx={{
                                height: "100%",
                                flexDirection: 'row',
                                justifyContent: "center",
                                alignItems: "center"
                            }
                            }
                        >
                            <Stack
                                sx={{
                                    minWidth: "200px",
                                    height: "100%",
                                    color: openedView === f ? "#fff" : "#aaa",
                                    backgroundColor: openedView === f ? "#222" : "#111",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    cursor: "pointer",
                                    '&:hover': {
                                        backgroundColor: openedView === f ? "#222" : '#333',
                                    },
                                }}
                                onClick={() => setOpenedViewFunction(f)}
                            >
                                <Stack
                                    sx={{
                                        width: "30px",
                                        height: "30px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: "5px",
                                        marginRight: "3px"
                                    }}
                                >
                                    <img src={
                                        (f.language === "plaintext" && images.plaintext) ||
                                        (f.language === "javascript" && images.javascript) ||
                                        (f.language === "python" && images.python) ||
                                        (f.language === "java" && images.java) ||
                                        (f.language === "cpp" && images.cpp)
                                    }
                                        style={{
                                            height: "100%",
                                            width: "100%"
                                        }}
                                        alt=""
                                    />
                                </Stack>
                                <Stack
                                    sx={{
                                        // width: "141px",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        marginLeft: "5px",
                                        height: "100%"
                                    }}
                                >
                                    <Typography>

                                        {f.filename}

                                    </Typography>
                                    <Typography
                                        sx={{
                                            marginLeft: "2px"
                                        }}
                                    >
                                        .{
                                            (f.language === "plaintext" && "txt") ||
                                            (f.language === "javascript" && "js") ||
                                            (f.language === "python" && "py") ||
                                            (f.language === "java" && "java") ||
                                            (f.language === "cpp" && "cpp")
                                        }
                                    </Typography>
                                </Stack>
                                {openedView === f &&
                                    <Stack
                                        sx={{
                                            width: "20px",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: "8px",
                                            marginRight: isChanged(f._id) ? "0px" : "10px"
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                color: '#fff',
                                            }}
                                            onClick={() => removeFileFromOpenedFiles(f)}
                                        >
                                            {!isChanged(f._id) ?
                                                <CloseIcon sx={{ fontSize: "large" }} />
                                                :
                                                <SaveIcon sx={{ fontSize: "large" }} />
                                            }
                                        </IconButton>

                                    </Stack>
                                }
                                {
                                    isChanged(f._id) &&
                                    <Stack
                                        sx={{
                                            width: "20px",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: "8px",
                                            marginRight: "10px"
                                        }}
                                    >
                                        {openedView !== f ? <FiberManualRecordIcon sx={{ fontSize: "large" }} /> : <IconButton
                                            sx={{
                                                color: '#fff',
                                            }}
                                            onClick={() => restoreCode(f)}
                                        >
                                            <RestorePageIcon sx={{ fontSize: "large" }} />

                                        </IconButton>}
                                    </Stack>
                                }
                            </Stack>
                            {(openedView !== f) && (ind === openedFiles.length - 1 ? true : openedFiles[ind + 1] !== openedView) && <Divider orientation='vertical' color="#555" flexItem variant='middle' />}
                        </Stack>
                    })
                }
            </Stack>
            {openedFiles.indexOf(openedView) === -1 ? <NotOpenedFileView /> : <ViewCodeContent codeLoading={codeLoading} setCodeLoading={setCodeLoading} editorRef={editorRef} />}
            <SnackBar />
        </Stack>
    )
}
