import { Box } from '@mui/material'
import React from 'react'
import SideNav from '../components/SideNav'
import Homepage from './Homepage'
import Compiler from './Compiler'
import Editor from './Editor'
import Messanger from './Messanger'
import Login from './Login'
import { useSelector } from 'react-redux'
import FileViewer from './FileViewer'

export default function WrapperPage({ component }) {

  const isLoggedIn = useSelector(state => state.isLoggedIn);


  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100vh", width: "100%" }}>
      <SideNav highlight={component} />
      {component === "home" && <Homepage />}
      {component === "compiler" && <Compiler />}
      {component === "filemanager" && (isLoggedIn ? <Editor /> : <Login redirected={true} component="filemanager" />)}
      {component === "messages" && (isLoggedIn ? <Messanger /> : <Login redirected={true} component="messages" />)}
      {component === "files" && (isLoggedIn ? <FileViewer /> : <Login redirected={true} component="files" />)}
      {component === "login" && <Login />}
    </Box>
  )
}
