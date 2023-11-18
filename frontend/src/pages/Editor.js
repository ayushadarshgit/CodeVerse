import { Stack } from '@mui/material'
import React from 'react'
import CompilerTopBar from '../components/CompilerTopBar'

export default function Editor() {
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
      <CompilerTopBar text="( Editor )" />
    </Stack>
  )
}
