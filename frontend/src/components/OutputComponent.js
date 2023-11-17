import { Stack } from '@mui/material'
import React from 'react'

export default function OutputComponent({output}) {
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
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#444",
                    borderRadius: "5px",
                    color: "#fff",
                    fontSize: "x-large"
                }}
            >
                Status: -
            </Stack>
            <Stack
                sx={{
                    height: "90%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#444",
                    borderRadius: "5px",
                    color: "#ddd",
                    fontSize: "larger",
                    overflow: "scroll",
                    cursor: "text"
                }}
            >
                {output.message}
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
                        height: "10%",
                        borderRadius: "5px",
                        backgroundColor: "#444",
                        color: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "x-large"
                    }}
                >
                    Output :- 
                </Stack>
                <Stack
                    sx={{
                        width: "96%",
                        height: "66%",
                        borderRadius: "5px",
                        backgroundColor: "#444",
                        color: "#ddd",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        fontSize: "large",
                        padding: "2%",
                        overflow: "scroll",
                        flexWrap: "wrap",
                        cursor: "text"
                    }}
                >
                    {output.output}
                </Stack>
            </Stack>
    </Stack>
  )
}
