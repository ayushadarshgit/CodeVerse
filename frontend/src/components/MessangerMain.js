import { Stack } from '@mui/material'
import React from 'react'
import AllChatComponent from './AllChatComponent'
import MainChat from './MainChat'

export default function MessangerMain() {
  return (
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
        <MainChat />
    </Stack>
  )
}
