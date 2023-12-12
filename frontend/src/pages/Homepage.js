import { Stack } from '@mui/material'
import React from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import SnackBar from '../components/SnackBar'

export default function Homepage() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#000"
      }}
    >
      <CompilerTopBar text="( Home )" />
      <SnackBar />
    </Stack>
  )
}
