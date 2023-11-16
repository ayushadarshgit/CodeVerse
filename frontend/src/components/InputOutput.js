import { Divider } from '@mui/material';
import React, { useState } from 'react'
import InputComponent from './InputComponent';

export default function InputOutput() {
  const [view, setView] = useState("input");
  return (
    <div style={{
      backgroundColor: "#333",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
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
            color: view === "input" ? "#fff" : "#aaa",
            fontSize: "large",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            cursor: "pointer",
            backgroundColor: view === "input" ? "#333" : "#222",
            borderRadius: "5px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          onClick={() => setView("input")}
        >
          Input
        </div>
        <Divider orientation='vertical' color="#999" flexItem variant='middle' />
        <div
          style={{
            width: "100px",
            color: view === "output" ? "#fff" : "#aaa",
            fontSize: "large",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            cursor: "pointer",
            backgroundColor: view === "output" ? "#333" : "#222",
            borderRadius: "5px",
            marginLeft: "10px"
          }}
          onClick={() => setView("output")}
        >
          Output
        </div>
      </div>
      <div style={{ width: "100%", height: "80%", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
        {view === "input" && <InputComponent />}
      </div>
      <div style={{width: "100%",height: "30px",justifyContent: "flex-end",alignItems: "center"}}>
        speed dial
      </div>
    </div>
  )
}
