import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function NotOpenedFileView() {
    return (
        <Stack
            sx={{
                height: "92%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "#aaa",
                backgroundColor: "#333"
            }}
        >
            <Typography sx={{fontSize: "x-large", marginBottom: "15px"}}>Click on the file on top, to continue coding ...</Typography>
            <Typography sx={{ fontSize: "xx-large" }}>Continue your coding journey with <span style={{ color: '#bbb', textDecoration: "underline" }}>CodeVerse</span> .</Typography>
        </Stack>
    )
}
