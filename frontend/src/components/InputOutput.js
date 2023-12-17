import { Alert, Divider, Skeleton, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import InputComponent from './InputComponent';
import { CompileCode } from "../Config/CompileCode"

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CopyToClipboard from '../Config/CopyToClipboard';
import InputCompilingLoader from '../Loaders/InputCompilingLoader';
import OutputComponent from './OutputComponent';
import OutputCompilingLoader from '../Loaders/OutputCompilingLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedFiles, showSnack } from '../features/login/loginSlice';
import SnackBar from './SnackBar';
import { saveFileChanges } from '../Config/EditorControllers';

export default function InputOutput({ editorRef, lang, setLang }) {
  const [input, setInput] = useState("");
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState({
    message: "Not Compiled",
    output: ["Compile The Code To View Output...."],
    success: true
  })
  const openedView = useSelector(state => state.openedView);
  const openedFiles = useSelector(state => state.openedFiles);
  const openedFilesSavedCode = useSelector(state => state.openedFilesSavedCode);
  const openedFilesCurrentCode = useSelector(state => state.openedFilesCurrentCode);
  const dispatch = useDispatch();
  const setShowSnackFunction = (message, severity) => {
    dispatch(showSnack({
      message: message,
      severity: severity
    }))
  }


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCompile = () => {
    const model = editorRef.current.getModel();
    const formattedCode = model.getValue();
    if (formattedCode === "") {
      setShowSnackFunction("Please provide the code to compile", "error");
    } else {
      CompileCode(setIsCompiling, setView, setOutput, formattedCode, lang, input)
    }


    // Need To Import This function from CompilerCode.js file
    // CompileCodeRapidApi(setIsCompiling, setView, setOutput, formattedCode, lang, input)
  }

  const handleCopy = () => {
    const model = editorRef.current.getModel();
    const formattedCode = model.getValue();
    CopyToClipboard(formattedCode);
    setOpen(false)
    setCopied(true);
  }

  const handleCopiedClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopied(false);
  }

  const saveChanges = () => {
    const sc = openedFilesSavedCode.filter(f => f.id !== openedView._id);
    const cc = openedFilesCurrentCode.filter(f => f.id === openedView._id);
    sc.push(cc[0]);
    saveFileChanges(openedView._id, cc[0].code, setShowSnackFunction);
    dispatch(setOpenedFiles({ files: openedFiles, savedCode: sc, currentCode: openedFilesCurrentCode }));
  }

  const handleSave = () => {
    if (!setLang) {
      const sc = openedFilesSavedCode.filter(f => f.id === openedView._id);
      const cc = openedFilesCurrentCode.filter(f => f.id === openedView._id);
      if (sc[0].code !== cc[0].code) {
        saveChanges();
      } else {
        setShowSnackFunction("The file is up to date. No need to save", "success");
      }
    } else {
      setShowSnackFunction("Here", "error");
    }
  }

  useEffect(() => {
    setInput("");
    setView(true);
    setOpen(false);
    setIsCompiling(false);
  }, [openedView])

  const actions = [
    { icon: <PlayArrowIcon sx={{ color: "#000" }} onClick={handleCompile} />, name: 'Compile Code' },
    { icon: <SaveIcon sx={{ color: "#000" }} onClick={handleSave} />, name: 'Save Code' },
    { icon: <FileCopyIcon sx={{ color: "#000" }} onClick={handleCopy} />, name: 'Copy Code' },
    { icon: <ShareIcon sx={{ color: "#000" }} />, name: 'Share Code' },
  ];
  return (
    <Stack style={{
      backgroundColor: "#333",
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",

      overflow: "scroll"
    }}>
      <Stack style={{
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#222",
        borderTop: "1px solid #444",
        height: "50px",
        flexDirection: "row"
      }}>
        <Stack
          style={{
            width: "100px",
            color: view ? "#fff" : "#aaa",
            fontSize: "large",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            cursor: "pointer",
            backgroundColor: view ? "#333" : "#222",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          onClick={() => setView(true)}
        >
          Input
        </Stack>
        <Divider orientation='vertical' color="#999" flexItem variant='middle' />
        <Stack
          style={{
            width: "100px",
            color: !view ? "#fff" : "#aaa",
            fontSize: "large",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            cursor: "pointer",
            backgroundColor: !view ? "#333" : "#222",
            borderRadius: "5px",
            marginLeft: "10px"
          }}
          onClick={() => setView(false)}
        >
          Output
        </Stack>
      </Stack>
      {view && <Stack
        style={{
          width: "100%",
          height: "80%",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {
          (isCompiling ?
            <InputCompilingLoader /> :
            <InputComponent lang={lang} setLang={setLang} input={input} setInput={setInput}
            />)}
      </Stack>}
      {view && <Stack
        style={{
          width: "100%",
          height: "10%",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {
          (isCompiling
            ?
            <Skeleton
              sx={{
                backgroundColor: "#666",
                marginRight: "30px",
                marginBottom: "15px"
              }}
              variant='circular'
              height={55}
              width={55}
            /> :
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon fontSize="large" openIcon={<EditIcon />} />}
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
            </SpeedDial>)}
        <Snackbar
          open={copied}
          autoHideDuration={2000}
          onClose={handleCopiedClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleCopiedClose} severity="success">
            Code Copied To Clipboard
          </Alert>
        </Snackbar>
      </Stack>}
      {
        !view &&
        <Stack style={{
          width: "100%",
          height: "92%"
        }}>
          {!isCompiling ? <OutputComponent output={output} /> : <OutputCompilingLoader />}
        </Stack>
      }
      <SnackBar />
    </Stack>
  )
}
