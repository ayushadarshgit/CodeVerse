import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function CodeLoaders() {
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                backgroundColor: "#222",
                overflow: "hidden"
            }}
        >
            <Skeleton width="200px" height="60px" sx={{ bgcolor: "#555", marginTop: "15px", marginLeft: "20px" }} />
            <Skeleton width="150px" height="60px" sx={{ bgcolor: "#555", marginTop: "8px", marginLeft: "20px" }} />
            <Skeleton width="120px" height="60px" sx={{ bgcolor: "#555", marginTop: "15px", marginLeft: "20px" }} />
            <Skeleton width="150px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "50px" }} />
            <Skeleton width="175px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "50px" }} />
            <Skeleton width="130px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "80px" }} />
            <Skeleton width="200px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "80px" }} />
            <Skeleton width="250px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "80px" }} />
            <Skeleton width="10px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "50px" }} />
            <Skeleton width="230px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "50px" }} />
            <Skeleton width="250px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "80px" }} />
            <Skeleton width="180px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "80px" }} />
            <Skeleton width="10px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "50px" }} />
            <Skeleton width="100px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "50px" }} />
            <Skeleton width="10px" height="60px" sx={{ bgcolor: "#555", marginTop: "5px", marginLeft: "20px" }} />
        </Stack>
    )
}
