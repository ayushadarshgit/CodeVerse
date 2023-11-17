import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function InputComponent() {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("cpp");
  const [showSelector,setShowSelector] = useState(false);

  const handleShowSelectorOpen = ()=>{
    setShowSelector(true);
  }

  const handleShowSelectorClose = (event,reason)=>{
    if (reason !== 'backdropClick') {
      setShowSelector(false);
    }
  }

  const handleShowSelectorChange = (e)=>{
    setLang(e.target.value)
  }
  return (
    <div style={{ width: "90%", height: "100%", display: "flex", justifyContent: "space-evenly", flexDirection: "column", alignItems: "center" }}>
      <Stack sx={{ width: "100%", height: "10%", }} justifyContent="space-between" alignItems="center" flexDirection="row">
        <Stack sx={{ width: "250px", height: "80%", backgroundColor: "#444", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", color: "#ddd", fontSize: "larger" }}>
          Selected Language: <span style={{ fontSize: "x-large" }}>{lang}</span>
        </Stack>
        <Button color='warning' onClick={handleShowSelectorOpen}>Change Language</Button>
      </Stack>
      <TextField
        id="standard-multiline-static"
        multiline
        rows={10}
        variant="filled"
        color='warning'
        placeholder='Enter Your Input Here....'
        InputProps={{
          style: {
            color: '#fff',
            fontSize: "20px"
          },
        }}
        sx={{
          backgroundColor: "#444",
          width: "100%",
          border: "1px solid #555",
          borderBottom: "none"
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}
