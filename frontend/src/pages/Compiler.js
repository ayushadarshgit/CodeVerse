import React, { useRef, useState } from 'react'
import { Resizable } from 're-resizable';
import MonacoEditor from '../components/MonacoEditor';
import { Box } from "@mui/material"
import InputOutput from '../components/InputOutput';
import CompilerTopBar from '../components/CompilerTopBar';

export default function Compiler() {
  const editorRef = useRef(null);
  const [lang, setLang] = useState("cpp");
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  }
  const onResizeStart = (event, { size, handle }) => {

  };
  const onResizeStop = (e, { size, handle }) => {

  }
  return (
    <div style={{
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      backgroundColor: "#000"
    }}>
      <CompilerTopBar text="( Compiler )" />
      <div style={{
        display: "flex",
        height: "90%",
        width: "100%",
        alignItems: "flex-start",
        overflow: "scroll"
      }}>
        <Resizable
          defaultSize={{
            width: "60%",
            height: "90%"
          }}
          style={{
            border: '1px solid #000',
            borderRight: '15px solid #000',
            resize: 'horizontal'
          }}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          minWidth="40%"
          maxWidth="65%"
          minHeight="100%"
          maxHeight="100%"
        >
          <MonacoEditor handleEditorDidMount={handleEditorDidMount} lang={lang} setLang={setLang} />
        </Resizable>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            minWidth: "400px",
            overflowX: "scroll"
          }}
        >
          <InputOutput editorRef={editorRef} lang={lang} setLang={setLang} />
        </Box>
      </div>
    </div>
  )
}
