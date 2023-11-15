import { Box } from '@mui/material'
import React from 'react'
import SideNav from '../components/SideNav'
import Homepage from './Homepage'
import Compiler from './Compiler'
import Editor from './Editor'
import Messanger from './Messanger'

export default function WrapperPage({component}) {
  return (
    <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",height: "100vh",width: "100%"}}>
      <SideNav highlight={component} />
      {component==="home" && <Homepage />}
      {component==="compiler" && <Compiler/>}
      {component==="filemanager" && <Editor/>}
      {component==="messages" && <Messanger/>}
    </Box>
  )
}
