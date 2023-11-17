import { Alert, Divider, Skeleton, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import React, { useState } from 'react'
import InputComponent from './InputComponent';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CopyToClipboard from '../Config/CopyToClipboard';
import InputCompilingLoader from '../Loaders/InputCompilingLoader';
import OutputComponent from './OutputComponent';
import OutputCompilingLoader from '../Loaders/OutputCompilingLoader';

export default function InputOutput({ editorRef, lang, setLang }) {
  const [view, setView] = useState(true);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState({
    message: "Not Compiled",
    output: "Compile The Code To View Output...."
  })


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setView(false)
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

  const actions = [
    { icon: <PlayArrowIcon sx={{ color: "#000" }} onClick={handleCompile} />, name: 'Compile Code' },
    { icon: <SaveIcon sx={{ color: "#000" }} />, name: 'Save Code' },
    { icon: <FileCopyIcon sx={{ color: "#000" }} onClick={handleCopy} />, name: 'Copy Code' },
    { icon: <ShareIcon sx={{ color: "#000" }} />, name: 'Share Code' },
  ];

  // const [output,setOutput] = useState("test value");

  // useEffect(()=>{
  //   const model = editorRef.current.getModel();
  //   const formattedCode = model.getValue();
  // // alert(formattedCode);
  //   // setOutput(formattedCode);
  //   console.log(formattedCode)
  // },[view])
  return (
    <div style={{
      backgroundColor: "#333",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",

      overflow: "scroll"
    }}>
      <div style={{
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#222",
        borderTop: "1px solid #444",
        height: "50px"
      }}>
        <div
          style={{
            width: "100px",
            color: view ? "#fff" : "#aaa",
            fontSize: "large",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            cursor: "pointer",
            backgroundColor: view ? "#333" : "#222",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          onClick={() => setView(true)}
        >
          Input
        </div>
        <Divider orientation='vertical' color="#999" flexItem variant='middle' />
        <div
          style={{
            width: "100px",
            color: !view ? "#fff" : "#aaa",
            fontSize: "large",
            display: "flex",
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
        </div>
      </div>
      {view && <div
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {
          (isCompiling ?
            <InputCompilingLoader /> :
            <InputComponent lang={lang} setLang={setLang}
            />)}
      </div>}
      {view && <div
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
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
      </div>}
      {
        !view && 
        <div style={{
          width: "100%",
          height: "92%"
        }}>
          { !isCompiling ? <OutputComponent output={output} /> : <OutputCompilingLoader />}
        </div>
      }
    </div>
  )
}
