import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function OutputCompilingLoader() {
  return (
    <Stack
        sx={{
            height: "100%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column"
        }}
    >
        <Stack
            sx={{
                height: "8%",
                width: "80%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
            }}
        >
            <Stack
                sx={{
                    height: "90%",
                    width: "200px",
                }}
            >
                <Skeleton variant='rounded' width="100%" height="100%" sx={{backgroundColor: "#666"}} />
            </Stack>
            <Stack
                sx={{
                    height: "90%",
                    width: "50%",
                }}
            >
                <Skeleton variant='rounded' width="100%" height="100%" sx={{backgroundColor: "#666"}} />
            </Stack>
        </Stack>
        <Stack
                sx={{
                    height: "80%",
                    width: "80%",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start"
                }}
            >
                <Stack 
                    sx={{
                        width: "250px",
                        height: "10%"
                    }}
                >
                    <Skeleton variant='rounded' width="100%" height="100%" sx={{backgroundColor: "#666"}} />
                </Stack>
                <Stack
                    sx={{
                        width: "100%",
                        height: "70%"
                    }}
                >
                    <Skeleton variant='rounded' width="100%" height="100%" sx={{backgroundColor: "#666"}} />
                </Stack>
            </Stack>
    </Stack>
  )
}
