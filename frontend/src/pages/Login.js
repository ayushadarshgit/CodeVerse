import { Stack } from '@mui/material'
import React from 'react'
import CompilerTopBar from '../components/CompilerTopBar'

export default function Login() {
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
      <CompilerTopBar text="( Login )" />
      <Stack
        sx={{
            height: "90%",
            width: "100%"
        }}
      ></Stack>
    </Stack>
  )
}
