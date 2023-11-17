import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField
} from '@mui/material'
import React, { useState } from 'react'

export default function InputComponent({ lang, setLang }) {
  const [input, setInput] = useState("");

  const [showSelector, setShowSelector] = useState(false);

  const handleShowSelectorOpen = () => {
    setShowSelector(true);
  }

  const handleShowSelectorClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setShowSelector(false);
    }
  }

  const handleShowSelectorChange = (e) => {
    setLang(e.target.value)
  }
  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "10%",
        }}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        <Stack
          sx={{
            width: "250px",
            height: "80%",
            backgroundColor: "#222",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            color: "#ddd",
            fontSize: "larger",
            borderRadius: "5px"
          }}
        >
          Selected Language: <span style={{ fontSize: "x-large" }}>{lang}</span>
        </Stack>
        <Button color='warning' onClick={handleShowSelectorOpen}>Change Language</Button>
        <Dialog open={showSelector} onClose={handleShowSelectorClose}>
          <DialogTitle>Select the Language Of Your Code...</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="lang-dialog-select-label">Lang..</InputLabel>
                <Select
                  labelId='lang-dialog-select-label'
                  id='lang-select'
                  value={lang}
                  onChange={handleShowSelectorChange}
                  input={<OutlinedInput label="Age" />}
                >
                  <MenuItem value="cpp">C++</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShowSelectorClose} color='warning'>Ok</Button>
          </DialogActions>
        </Dialog>
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
          backgroundColor: "#222",
          width: "100%",
          border: "1px solid #555",
          borderBottom: "none",
          borderRadius: "5px"
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}
