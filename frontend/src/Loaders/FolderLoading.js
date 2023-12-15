import { Skeleton, Stack } from '@mui/material'
import React from 'react'

export default function FolderLoading() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{
          width: "60%",
          height: "50px",
          backgroundColor: "#222",
          borderRadius: "10px",
          color: "#ccc",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "xx-large",
          flexDirection: "row"
        }}
      >

        <Stack
          sx={{
            marginLeft: "20px",
            color: '#fff',
          }}
        >
          <Skeleton variant='circular' height={40} width={40} sx={{ backgroundColor: "#555" }} />
        </Stack>

        <Stack
          sx={{
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton variant='rounded' height={30} width={250} sx={{ backgroundColor: "#555" }} />
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "95%",
          height: "85%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          border: "1px solid #333",
          borderRadius: "8px",
          overflowY: "scroll",
          flexDirection: "row"
        }}
      >
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />
        <Skeleton width={100} height={150} sx={{ backgroundColor: "#555", marginLeft: "30px" }} />


        <Skeleton variant='circular' width={60} height={60} sx={{ backgroundColor: "#555", position: "absolute", right: 50, bottom: 35 }} />

      </Stack>
    </Stack>
  )
}
