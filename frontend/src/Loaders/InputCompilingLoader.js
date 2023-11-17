import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function InputCompilingLoader() {
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
                        backgroundColor: "#444",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "row",
                        color: "#ddd",
                        fontSize: "larger"
                    }}
                >
                    <Skeleton variant="rounded" sx={{backgroundColor: "#666"}} width="100%" height="100%" />
                </Stack>
                <Skeleton variant="rounded" sx={{backgroundColor: "#666"}} width="200px" height="70%" />
            </Stack>
            <Skeleton variant="rounded" sx={{backgroundColor: "#666"}} width="100%" height="60%"/>
        </div>
    )
}
