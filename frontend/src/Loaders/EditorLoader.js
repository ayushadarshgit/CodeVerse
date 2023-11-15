import { Skeleton } from '@mui/material'
import React from 'react'

export default function EditorLoader() {
  return (
    <div style={{width: "100%",height: "100%",display: "flex",justifyContent: "flex-start",alignItems: "flex-start",backgroundColor: "#111",flexDirection: "column"}}>
      <Skeleton width="15%" height="30px" sx={{bgcolor: "#555",marginTop: "15px",marginLeft: "20px"}}/>
      <Skeleton width="18%" height="30px" sx={{bgcolor: "#555",marginTop: "15px",marginLeft: "20px"}}/>
      <Skeleton width="8%" height="30px" sx={{bgcolor: "#555",marginTop: "20px",marginLeft: "20px"}}/>
      <Skeleton width="20%" height="30px" sx={{bgcolor: "#555",marginTop: "30px",marginLeft: "70px"}}/>
      <Skeleton width="10%" height="30px" sx={{bgcolor: "#555",marginTop: "30px",marginLeft: "70px"}}/>
      <Skeleton width="5%" height="30px" sx={{bgcolor: "#555",marginTop: "30px",marginLeft: "70px"}}/>
      <Skeleton width="15%" height="30px" sx={{bgcolor: "#555",marginTop: "30px",marginLeft: "70px"}}/>
      <Skeleton width="1%" height="30px" sx={{bgcolor: "#555",marginTop: "15px",marginLeft: "20px"}}/>
    </div>
  )
}
