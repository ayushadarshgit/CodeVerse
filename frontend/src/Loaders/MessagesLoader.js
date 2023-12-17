import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function MessagesLoader() {
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Stack
                sx={{
                    width: "100%",
                    height: "80px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#111",
                    borderBottom: "1px solid #555",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px"
                }}
            >
                <Stack
                    sx={{
                        flexDirection: "row",
                        width: "400px",
                        height: "70px",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Stack
                        sx={{
                            width: "100px",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Skeleton variant="circular" width={50} height={50} sx={{ backgroundColor: "#444" }} />
                    </Stack>
                    <Skeleton variant="rounded" width="300px" height={50} sx={{ backgroundColor: "#444" }} />
                </Stack>
                <Stack
                    sx={{
                        width: "100px",
                        height: "70px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Skeleton variant="rounded" width="50%" height="50px" sx={{ backgroundColor: "#444" }} />
                </Stack>
            </Stack>
            <Stack
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    overflow: "scroll"
                }}
            >
                <Stack
                    sx={{
                        flex: 1,
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="20%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="30%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="10%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="30%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="20%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="40%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="30%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                    <Stack
                        sx={{
                            width: "95%",
                            height: "60px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <Skeleton width="20%" height="100%" sx={{backgroundColor: "#444"}} />
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: "95%",
                        marginBottom: "15px",
                        borderRadius: "5px",
                        height: "60px",
                        overflow: "scroll"
                    }}
                >
                    <Skeleton variant="rounded" width="100%" height="100%" sx={{backgroundColor: "#444"}} />
                </Stack>

            </Stack>
        </Stack>
    )
}
