import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function ChatLoader() {
  return (
    <Stack
        sx={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center"
        }}
    >
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
        <Skeleton sx={{backgroundColor: "#333", marginTop: "20px"}} variant="rounded" width={330} height={50} />
    </Stack>
  )
}
