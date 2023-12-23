import { Box, Stack } from '@mui/material'
import React from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import AllChatComponent from '../components/AllChatComponent'
import MainChat from '../components/MainChat'

export default function Messanger({ socket }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#000"
      }}
    >
      <CompilerTopBar text="( Messenger )" />
      <Stack
        sx={{
          width: "100%",
          height: "91.25%",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <AllChatComponent />
        <MainChat socket={socket} />
      </Stack>
    </Box>
  )
}
