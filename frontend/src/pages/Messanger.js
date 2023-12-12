import { Box } from '@mui/material'
import React from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import MessangerMain from '../components/MessangerMain'

export default function Messanger() {
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
      <MessangerMain />
    </Box>
  )
}
