import React from 'react'
import { Resizable } from 're-resizable';
import MonacoEditor from '../components/MonacoEditor';
import { Box, TextField } from "@mui/material"
import InputOutput from '../components/InputOutput';
import CompilerTopBar from '../components/CompilerTopBar';

export default function Compiler() {
  const handleResizeStart = (e, direction) => {
    if (direction !== "right") {
      e.stopPropagation();
    }
  };
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
      <CompilerTopBar/>
      <div style={{
        display: "flex",
        height: "90%",
        width: "100%",
        alignItems: "flex-start"
      }}>
        <Resizable
          defaultSize={{
            width: "80%",
            height: "90%"
          }}
          style={{
            border: '1px solid #333',
            borderRight: '15px solid #333'
          }}
          onResizeStart={handleResizeStart}
          minWidth="40%"
          maxWidth="100%"
          minHeight="100%"
          maxHeight="100%"
        >
          <MonacoEditor />
        </Resizable>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <InputOutput />
        </Box>
      </div>
    </div>
  )
}
