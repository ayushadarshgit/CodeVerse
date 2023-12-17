import { SpeedDial, SpeedDialAction, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import MonacoEditor from "./MonacoEditor"
import { useDispatch, useSelector } from 'react-redux'
import CodeLoaders from '../Loaders/CodeLoaders';
import { setOpenedCode, setOpenedFiles, showSnack } from '../features/login/loginSlice';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';

import SaveIcon from '@mui/icons-material/Save';
import InputOutput from './InputOutput';
import { saveFileChanges } from '../Config/EditorControllers';

export default function ViewCodeContent({ codeLoading, setCodeLoading, editorRef }) {
    const openedView = useSelector(state => state.openedView);
    const openedCode = useSelector(state => state.openedCode);
    const openedFiles = useSelector(state => state.openedFiles);
    const openedFilesSavedCode = useSelector(state => state.openedFilesSavedCode);
    const openedFilesCurrentCode = useSelector(state => state.openedFilesCurrentCode);
    const dispatch = useDispatch();

    const setOpenedCodeFunction = (code) => {
        dispatch(setOpenedCode({ code: code }));
    }

    const handleChange = (id) => {
        const model = editorRef.current.getModel();
        const formattedCode = model.getValue();
        const cc = openedFilesCurrentCode.filter(f => f.id !== id);
        cc.push({ id: id, code: formattedCode });
        dispatch(setOpenedFiles({ files: openedFiles, savedCode: openedFilesSavedCode, currentCode: cc }));
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const setShowSnackFunction = (message, severity) => {
        dispatch(showSnack({
            message: message,
            severity: severity
        }))
    }

    const saveChanges = () => {
        const s = openedFilesSavedCode.filter(f => f.id === openedView._id);
        const cc = openedFilesCurrentCode.filter(f => f.id === openedView._id);
        if(s[0].code !== cc[0].code){
            const sc = openedFilesSavedCode.filter(f => f.id !== openedView._id);
            sc.push(cc[0]);
            saveFileChanges(openedView._id, cc[0].code, setShowSnackFunction);
            dispatch(setOpenedFiles({ files: openedFiles, savedCode: sc, currentCode: openedFilesCurrentCode }));
        }else{
            setShowSnackFunction("The file is up to date. No need to save","success")
        }
    }

    const actions = [
        { icon: <SaveIcon sx={{ color: "#000" }} onClick={saveChanges} />, name: 'Save Code' },
    ];

    useEffect(() => {
        setCodeLoading(true);
        const f = openedFilesCurrentCode.filter(f => f.id === openedView._id);
        setOpenedCodeFunction(f[0].code);
        setCodeLoading(false);
        // eslint-disable-next-line
    }, [openedView]);
    return (
        <Stack
            sx={{
                width: "100%",
                height: "83%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
            }}
        >
            <Stack
                sx={{
                    width: (openedView.language === "plaintext" || openedView.language === "javascript") ? "100%" : "60%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#333"
                }}
            >
                {codeLoading ? <CodeLoaders /> : <MonacoEditor handleEditorDidMount={handleEditorDidMount} lang={openedView.language} startCode={openedCode} onChange={handleChange} />}
                {!codeLoading && (openedView.language === "plaintext" || openedView.language === "javascript") && <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 15, right: 25 }}
                    icon={<SpeedDialIcon fontSize="large" openIcon={<EditIcon />} />}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
                    // open={open}
                    direction='left'
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            color='#000'
                        />
                    ))}
                </SpeedDial>}
            </Stack>
            {openedView.language !== "plaintext" && openedView.language !== "javascript" && <Stack
                sx={{
                    height: "100%",
                    width: "39.5%",
                }}
            >
                <InputOutput editorRef={editorRef} lang={openedView.language} />
            </Stack>}
        </Stack>
    )
}
