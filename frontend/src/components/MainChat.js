import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function MainChat() {
  return (
    <Stack
      sx={{
        width: "72%",
        height: "97%",
        marginLeft: "5px",
        backgroundColor: "#222",
        border: "1px solid #444",
        overflow: "scroll",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "xx-large",
          color: "#aaa"
        }}
      >
        Click on the chat to view the Messages...
      </Typography>
    </Stack>
  )
}
