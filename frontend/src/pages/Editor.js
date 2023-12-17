import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import { useDispatch, useSelector } from "react-redux";
import FolderLoading from '../Loaders/FolderLoading';
import { setFolder, setFolderLoading, showSnack } from '../features/login/loginSlice';
import SnackBar from "../components/SnackBar";
import { getFolder } from '../Config/EditorControllers';
import FolderComponent from '../components/FolderComponent';

export default function Editor() {
  const folderLoading = useSelector(state => state.folderLoading);
  const user = useSelector(state => state.user);
  const folder = useSelector(state => state.folder);

  const dispatch = useDispatch();

  const getFolderDetailsFunction = (folder) => {
    dispatch(setFolder({ folder: folder }))
  }

  const setShowSnackFunction = (message, severity) => {
    dispatch(showSnack({
      message: message,
      severity: severity
    }))
  }

  const setFolderLoadingFunction = (loading) => {
    dispatch(setFolderLoading({ loading: loading }));
  }

  useEffect(() => {
    if (!folder) {
      setFolderLoadingFunction(true);
      getFolder(user.defaultfolder, getFolderDetailsFunction, setShowSnackFunction, setFolderLoadingFunction);
    }
    // eslint-disable-next-line
  }, [])


  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#000"
      }}
    >
      <CompilerTopBar text="( File Manager )" />
      <Stack
        sx={{
          width: "100%",
          height: "90%",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll"
        }}
      >
        {folderLoading && <FolderLoading />}
        {!folderLoading && folder && <FolderComponent />}
      </Stack>
      <SnackBar />
    </Stack>
  )
}
