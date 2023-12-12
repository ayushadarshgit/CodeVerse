import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideSnack } from '../features/login/loginSlice'

const SnackBar = () => {
    const open = useSelector(state => state.show);
    const severity = useSelector((state) => state.severity);
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const handleSnackClose = () => {
        dispatch(hideSnack());
    }
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleSnackClose}
        >
            <Alert severity={severity} onClose={handleSnackClose} sx={{ maxWidth: "400px" }}>{message}</Alert>
        </Snackbar>
    )
}

export default SnackBar
